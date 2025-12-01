import { IsBoolean } from 'class-validator';

export class BanUserDTO {
  @IsBoolean()
  banned: boolean;
}
