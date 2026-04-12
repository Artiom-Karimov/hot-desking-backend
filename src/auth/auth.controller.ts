import { Body, Controller, Post } from '@nestjs/common';
import { AccessDTO, LoginDTO } from './dto';
import { AuthService } from './auth.service';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @ApiCreatedResponse({ type: AccessDTO, description: 'Login successful' })
  @ApiBadRequestResponse({ description: 'Wrong input' })
  @ApiUnauthorizedResponse({ description: 'Wrong email or password' })
  login(@Body() data: LoginDTO): Promise<AccessDTO> {
    return this.authService.login(data);
  }
}
