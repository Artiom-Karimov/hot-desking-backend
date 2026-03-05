import { Injectable } from '@nestjs/common';
import { createTransport, SendMailOptions, Transporter } from 'nodemailer';
import { config } from 'src/common';

@Injectable()
export class EmailService {
  private readonly transport: Transporter;

  constructor() {
    this.transport = createTransport(config.email);
  }

  public async send(options: SendMailOptions): Promise<void> {
    await this.transport.sendMail(options);
  }
}
