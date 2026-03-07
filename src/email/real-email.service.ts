import { Injectable } from '@nestjs/common';
import { createTransport, SendMailOptions, Transporter } from 'nodemailer';
import { config } from 'src/common';
import { EmailService } from './email.service';

@Injectable()
export class RealEmailService extends EmailService {
  private readonly transport: Transporter;

  constructor() {
    super();
    this.transport = createTransport(config.email);
  }

  public async send(options: SendMailOptions): Promise<void> {
    await this.transport.sendMail(options);
  }
}
