import {
  createParamDecorator,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { RequestWithUser } from 'src/auth/dto';
import { JWTUser } from 'src/auth/models';

/**
 * @description Parameter decorator. Gets user from authorized request.
 * @returns JWTUser
 */
export const User = createParamDecorator<unknown, JWTUser>(
  (_: unknown, context: ExecutionContext) => {
    const request = context.switchToHttp().getRequest<RequestWithUser>();
    if (!request.user) {
      throw new UnauthorizedException();
    }

    return request.user;
  },
);
