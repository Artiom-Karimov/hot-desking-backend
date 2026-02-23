import { Module } from '@nestjs/common';
import { UsersModule } from './users';
import { AuthModule } from './auth';
import { PrismaModule } from './prisma';

@Module({
  imports: [AuthModule, UsersModule, PrismaModule],
})
export class AppModule {}
