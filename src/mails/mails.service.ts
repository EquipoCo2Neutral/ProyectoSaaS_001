import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';

import { generateTokenInvitation } from '../utilties/token';

@Injectable()
export class MailsService {
  constructor(private readonly mailerService: MailerService) {}

  async sendInvitation(
    user: string,
    email: string,
    rol: string,
    inquilinoId: string,
  ) {
    const token = generateTokenInvitation(email, rol, inquilinoId);
    const url = `http://localhost:3000/register?token=${token}`;
    await this.mailerService.sendMail({
      to: email,
      subject: 'Invitacion Enerley',
      template: './invitation',
      context: {
        name: user,
        rol,
        url,
      },
    });
  }
}
