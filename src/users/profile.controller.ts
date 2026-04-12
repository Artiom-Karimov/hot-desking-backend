import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ProfileService } from './profile.service';
import { ResetPasswordDTO, SetPasswordDTO, ViewProfileDTO } from './dto';
import { AccessGuard, SWAGGER_BEARER_NAME, User } from 'src/common';
import type { JWTUser } from 'src/auth/models';
import { ApiBearerAuth } from '@nestjs/swagger';

@Controller('profile')
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}

  @Get()
  @UseGuards(AccessGuard)
  @ApiBearerAuth(SWAGGER_BEARER_NAME)
  getProfile(@User() user: JWTUser): Promise<ViewProfileDTO> {
    return this.profileService.getSelf(user.userId);
  }

  @Post('reset')
  @HttpCode(HttpStatus.NO_CONTENT)
  resetPassword(@Body() { email }: ResetPasswordDTO): Promise<void> {
    return this.profileService.resetPassword(email);
  }

  @Post('password')
  @HttpCode(HttpStatus.NO_CONTENT)
  setPassword(@Body() data: SetPasswordDTO): Promise<void> {
    return this.profileService.setPassword(data);
  }
}
