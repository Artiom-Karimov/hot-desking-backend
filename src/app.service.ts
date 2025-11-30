import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(name: string, times: number = 1): string {
    return `Hello ${name}!`.repeat(times);
  }
}
