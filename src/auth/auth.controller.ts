import { Body, Controller, Post } from '@nestjs/common';
import { AccessDTO, LoginDTO } from './dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  login(@Body() data: LoginDTO): Promise<AccessDTO> {
    return this.authService.login(data);
  }
}
