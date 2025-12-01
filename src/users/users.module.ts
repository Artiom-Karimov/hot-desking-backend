import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { ProfileController } from './profile.controller';
import { ProfileService } from './profile.service';

@Module({
  controllers: [ProfileController, UsersController],
  providers: [ProfileService, UsersService],
  exports: [ProfileService],
})
export class UsersModule {}
