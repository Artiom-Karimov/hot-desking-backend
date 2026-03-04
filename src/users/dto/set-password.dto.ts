import { IsEmail, IsStrongPassword, Length } from 'class-validator';

export class SetPasswordDTO {
  @Length(1, 100)
  code: string;

  @IsEmail()
  email: string;

  @IsStrongPassword()
  password: string;
}
