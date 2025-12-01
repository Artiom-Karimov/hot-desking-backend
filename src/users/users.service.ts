import { randomUUID } from 'crypto';
import {
  BanUserDTO,
  CreateUserDTO,
  UserRole,
  UserStatus,
  ViewUserDTO,
} from './dto';

export class UsersService {
  create(data: CreateUserDTO): ViewUserDTO {
    return {
      ...data,
      id: randomUUID(),
      status: UserStatus.Active,
      createdAt: new Date(),
      createdBy: randomUUID(),
    };
  }

  get(): ViewUserDTO[] {
    return [];
  }

  getOne(id: string): ViewUserDTO {
    return {
      id,
      status: UserStatus.Active,
      createdAt: new Date(),
      createdBy: randomUUID(),
      firstName: 'One',
      lastName: 'Two',
      email: 'one@example.com',
      role: UserRole.User,
    };
  }

  update(id: string, data: CreateUserDTO): ViewUserDTO {
    return {
      ...data,
      id,
      status: UserStatus.Active,
      createdAt: new Date(),
      createdBy: randomUUID(),
    };
  }

  ban(id: string, data: BanUserDTO): ViewUserDTO {
    return {
      id,
      status: data.banned ? UserStatus.Banned : UserStatus.Active,
      createdAt: new Date(),
      createdBy: randomUUID(),
      firstName: 'One',
      lastName: 'Two',
      email: 'one@example.com',
      role: UserRole.User,
    };
  }
}
