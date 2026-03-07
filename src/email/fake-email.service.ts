import { Injectable } from '@nestjs/common';
import { SendMailOptions } from 'nodemailer';
import { EmailService } from './email.service';

@Injectable()
export class FakeEmailService extends EmailService {
  public send(options: SendMailOptions): Promise<void> {
    console.log('Email:', JSON.stringify(options));

    return Promise.resolve();
  }
}
