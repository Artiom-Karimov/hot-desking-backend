import { config } from 'src/common';
import { PasswordResetEmailDTO } from './password-reset.email.dto';

export class HelloEmailDTO {
  public readonly template = 'hello';

  public readonly name: string;

  public readonly link: string;

  public readonly expiration: string;

  constructor(data: PasswordResetEmailDTO) {
    const { baseUrl, confirmUrl } = config.frontend;

    this.name = data.name;
    this.link = `${baseUrl}${confirmUrl}?email=${data.email}&code=${data.code}`;
    this.expiration = data.expiresAt.toLocaleDateString('ru-RU');
  }
}
