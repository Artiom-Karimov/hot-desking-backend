import { UserRole, UserStatus } from 'src/users/dto';

export type LoginDataDTO = {
  id: string;
  hash: string;
  role: UserRole;
  status: UserStatus;
};
