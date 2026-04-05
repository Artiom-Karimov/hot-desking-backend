import { SetMetadata } from '@nestjs/common';
import { UserRole } from 'src/users/dto';

export const ROLES_METADATA_KEY = 'roles';

export const Roles = (...roles: UserRole[]): ReturnType<typeof SetMetadata> =>
  SetMetadata(ROLES_METADATA_KEY, roles);
