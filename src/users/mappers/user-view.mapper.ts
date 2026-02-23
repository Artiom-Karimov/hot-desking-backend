import { User } from 'generated/prisma/client';
import { mapUserRoleFromDB } from './user-role.mapper';
import { mapUserStatusFromDB } from './user-status.mapper';
import { ViewUserDTO } from '../dto';

export class UserViewMapper {
  mapOne(data: User): ViewUserDTO {
    return {
      id: data.id,
      role: mapUserRoleFromDB(data.role),
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      status: mapUserStatusFromDB(data.status),
      createdAt: data.createdAt,
      createdBy: data.createdBy,
    };
  }

  mapMany(data: User[]): ViewUserDTO[] {
    return data.map((one) => this.mapOne(one));
  }
}
