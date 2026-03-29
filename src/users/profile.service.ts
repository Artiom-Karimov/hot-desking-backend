import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { SetPasswordDTO, ViewProfileDTO } from './dto';
import { PasswordResetService } from './password-reset.service';
import { PrismaService } from 'src/prisma';
import { UserStatus } from 'generated/prisma/enums';
import { HelloEmailService } from 'src/email';
import { mapUserRoleFromDB } from './mappers';

@Injectable()
export class ProfileService {
  constructor(
    private readonly helloEmailService: HelloEmailService,
    private readonly passwordResetService: PasswordResetService,
    private readonly prisma: PrismaService,
  ) {}

  public async getSelf(id: string): Promise<ViewProfileDTO> {
    const user = await this.prisma.user.findUnique({
      where: { id },
      select: {
        role: true,
        firstName: true,
        lastName: true,
        email: true,
      },
    });

    if (!user) {
      throw new NotFoundException('User not found.');
    }

    return {
      id,
      role: mapUserRoleFromDB(user.role),
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
    };
  }

  public async resetPassword(email: string): Promise<void> {
    const user = await this.prisma.user.findFirst({
      where: { email: { equals: email, mode: 'insensitive' } },
    });

    if (!user) return;
    if (user.status !== UserStatus.active) {
      throw new ForbiddenException('Account is banned');
    }

    const reset = await this.passwordResetService.createOrReplace(user.id);
    await this.helloEmailService.send({
      ...reset,
      email: user.email,
      name: user.firstName,
    });
  }

  public async setPassword({
    email,
    code,
    password,
  }: SetPasswordDTO): Promise<void> {
    const user = await this.prisma.user.findFirst({
      where: { email: { equals: email, mode: 'insensitive' } },
    });

    if (!user) return;
    if (user.status !== UserStatus.active) {
      throw new ForbiddenException('Account is banned');
    }

    await this.passwordResetService.setPassword(user.id, code, password);
  }
}
