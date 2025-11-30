import {
  BadRequestException,
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Query,
} from '@nestjs/common';
import { AppService } from './app.service';

@Controller('app')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('hello/:name')
  getHello(
    @Param('name') name: string,
    @Query() query: { times?: number },
  ): string {
    return this.appService.getHello(name, query.times);
  }

  @Post()
  @HttpCode(HttpStatus.OK)
  createHello(@Body() data: { name: string; times?: number }): string {
    if (!data.name) {
      throw new BadRequestException('name not provided');
    }

    return this.appService.getHello(data.name, data.times);
  }
}
