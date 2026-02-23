import { UserStatus as DB } from 'generated/prisma/enums';
import { UserStatus as Client } from '../dto';

const toDbMap: Record<Client, DB> = {
  [Client.Active]: DB.active,
  [Client.Banned]: DB.banned,
};

const fromDbMap: Record<DB, Client> = {
  [DB.active]: Client.Active,
  [DB.banned]: Client.Banned,
};

export const mapUserStatusToDB = (value: Client): DB => toDbMap[value];

export const mapUserStatusFromDB = (value: DB): Client => fromDbMap[value];
