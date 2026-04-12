import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { BanUserDTO, CreateUserDTO, UserRole, ViewUserDTO } from './dto';
import {
  AccessGuard,
  IdParamDTO,
  Roles,
  SWAGGER_BEARER_NAME,
  User,
} from 'src/common';
import type { JWTUser } from 'src/auth/models';
import { ApiBearerAuth } from '@nestjs/swagger';

@Controller('users')
@Roles(UserRole.Admin)
@UseGuards(AccessGuard)
@ApiBearerAuth(SWAGGER_BEARER_NAME)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create(
    @User() { userId }: JWTUser,
    @Body() data: CreateUserDTO,
  ): Promise<ViewUserDTO> {
    return this.usersService.create(data, userId);
  }

  @Get()
  get(): Promise<ViewUserDTO[]> {
    return this.usersService.get();
  }

  @Get(':id')
  getOne(@Param() { id }: IdParamDTO): Promise<ViewUserDTO> {
    return this.usersService.getOne(id);
  }

  @Put(':id')
  update(
    @Param() { id }: IdParamDTO,
    @Body() data: CreateUserDTO,
  ): Promise<ViewUserDTO> {
    return this.usersService.update(id, data);
  }

  @Post(':id/ban')
  ban(
    @Param() { id }: IdParamDTO,
    @Body() data: BanUserDTO,
  ): Promise<ViewUserDTO> {
    return this.usersService.ban(id, data);
  }
}
