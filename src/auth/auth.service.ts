import { ProfileService } from 'src/users/profile.service';
import { AccessDTO, LoginDTO } from './dto';
import { randomUUID } from 'crypto';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthService {
  constructor(private readonly profileService: ProfileService) {}

  login(data: LoginDTO): AccessDTO {
    const id = randomUUID();
    const profile = this.profileService.getSelf(id);
    return { ...profile, token: 'hello' };
  }
}
