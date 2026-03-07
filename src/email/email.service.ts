import { Injectable } from '@nestjs/common';
import { SendMailOptions } from 'nodemailer';

@Injectable()
export abstract class EmailService {
  public abstract send(options: SendMailOptions): Promise<void>;
}
