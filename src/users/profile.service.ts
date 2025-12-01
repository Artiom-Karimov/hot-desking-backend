import { UserRole, ViewProfileDTO } from './dto';

export class ProfileService {
  public getSelf(id: string): ViewProfileDTO {
    return {
      id,
      role: UserRole.User,
      firstName: 'One',
      lastName: 'Two',
      email: 'user@example.com',
    };
  }
}
