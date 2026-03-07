import { Module } from '@nestjs/common';
import { EmailService } from './email.service';
import { HelloEmailService } from './hello-email.service';
import { EmailTemplateService } from './email-template.service';
import { FakeEmailService } from './fake-email.service';
import { config } from 'src/common';
import { RealEmailService } from './real-email.service';

@Module({
  providers: [
    {
      provide: EmailService,
      useClass: config.email.disabled ? FakeEmailService : RealEmailService,
    },
    EmailTemplateService,
    HelloEmailService,
  ],
  exports: [HelloEmailService],
})
export class EmailModule {}
