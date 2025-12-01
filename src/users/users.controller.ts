import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { UsersService } from './users.service';
import { BanUserDTO, CreateUserDTO, ViewUserDTO } from './dto';
import { IdParamDTO } from 'src/common';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create(@Body() data: CreateUserDTO): ViewUserDTO {
    return this.usersService.create(data);
  }

  @Get()
  get(): ViewUserDTO[] {
    return this.usersService.get();
  }

  @Get(':id')
  getOne(@Param() { id }: IdParamDTO): ViewUserDTO {
    return this.usersService.getOne(id);
  }

  @Put(':id')
  update(
    @Param() { id }: IdParamDTO,
    @Body() data: CreateUserDTO,
  ): ViewUserDTO {
    return this.usersService.update(id, data);
  }

  @Post(':id/ban')
  ban(@Param() { id }: IdParamDTO, @Body() data: BanUserDTO): ViewUserDTO {
    return this.usersService.ban(id, data);
  }
}
