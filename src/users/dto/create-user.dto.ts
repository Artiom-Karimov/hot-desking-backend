import { IsEmail, IsEnum, Length } from 'class-validator';
import { UserRole } from './user-role';

export class CreateUserDTO {
  @IsEmail()
  email: string;

  @Length(1, 50)
  firstName: string;

  @Length(1, 50)
  lastName: string;

  @IsEnum(UserRole)
  role: UserRole;
}
