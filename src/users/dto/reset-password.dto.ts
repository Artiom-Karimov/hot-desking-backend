import { IsEmail } from 'class-validator';

export class ResetPasswordDTO {
  @IsEmail()
  email: string;
}
