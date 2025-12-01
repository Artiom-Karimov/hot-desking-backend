import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
} from '@nestjs/common';
import { ProfileService } from './profile.service';
import { ResetPasswordDTO, SetPasswordDTO, ViewProfileDTO } from './dto';
import { randomUUID } from 'crypto';

@Controller('profile')
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}

  @Get()
  getProfile(): ViewProfileDTO {
    return this.profileService.getSelf(randomUUID());
  }

  @Post('reset')
  @HttpCode(HttpStatus.NO_CONTENT)
  resetPassword(@Body() data: ResetPasswordDTO): void {}

  @Post('password')
  @HttpCode(HttpStatus.NO_CONTENT)
  setPassword(@Body() data: SetPasswordDTO): void {}
}
