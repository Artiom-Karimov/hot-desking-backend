import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Request } from 'express';
import { JWTUser, UserJWT } from '../../auth/models';
import { config, ROLES_METADATA_KEY } from 'src/common';
import { RequestWithUser } from '../../auth/dto';
import { Reflector } from '@nestjs/core';
import { UserRole } from 'src/users/dto';

const ERROR_MESSAGE = 'Wrong or missing token';

@Injectable()
export class AccessGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  private readonly jwt = new UserJWT(
    config.jwt.secret,
    config.jwt.expirationSeconds,
  );

  public async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<RequestWithUser>();
    const token = this.extractToken(request);
    const user = await this.verify(token);
    this.checkRoles(context, user);

    request.user = user;

    return true;
  }

  private extractToken(request: Request): string {
    const authorization = request.headers.authorization ?? null;
    if (!authorization || typeof authorization !== 'string') {
      throw new UnauthorizedException(ERROR_MESSAGE);
    }

    const [type, token] = authorization.split(' ');
    if (type !== 'Bearer') {
      throw new UnauthorizedException(ERROR_MESSAGE);
    }

    return token;
  }

  private async verify(token: string): Promise<JWTUser> {
    try {
      return await this.jwt.verify(token);
    } catch (error) {
      console.warn(`Error verifying token: ${JSON.stringify(error)}`);
      throw new UnauthorizedException(ERROR_MESSAGE);
    }
  }

  private checkRoles(context: ExecutionContext, user: JWTUser): void {
    const forMethod = this.reflector.get<UserRole[]>(
      ROLES_METADATA_KEY,
      context.getHandler(),
    );

    if (forMethod?.length) {
      if (forMethod.includes(user.userRole)) return;
      else throw new ForbiddenException();
    }

    const forController = this.reflector.get<UserRole[]>(
      ROLES_METADATA_KEY,
      context.getClass(),
    );

    if (!forController?.length) return;

    if (!forController.includes(user.userRole)) {
      throw new ForbiddenException();
    }
  }
}
