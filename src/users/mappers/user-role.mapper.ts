import { UserRole as DB } from 'generated/prisma/enums';
import { UserRole as Client } from '../dto';

const toDbMap: Record<Client, DB> = {
  [Client.Admin]: DB.admin,
  [Client.User]: DB.user,
};

const fromDbMap: Record<DB, Client> = {
  [DB.admin]: Client.Admin,
  [DB.user]: Client.User,
};

export const mapUserRoleToDB = (value: Client): DB => toDbMap[value];

export const mapUserRoleFromDB = (value: DB): Client => fromDbMap[value];
