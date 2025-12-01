import { IsUUID } from 'class-validator';

export class IdParamDTO {
  @IsUUID(4)
  id: string;
}
