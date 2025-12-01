import { IsEmail, IsStrongPassword } from 'class-validator';

export class LoginDTO {
  @IsEmail()
  email: string;

  @IsStrongPassword()
  password: string;
}
