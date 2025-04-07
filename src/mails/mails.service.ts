import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';

import { generateTokenInvitation } from '../utilties/token';

@Injectable()
export class MailsService {
  constructor(private readonly mailerService: MailerService) {}

  async sendInvitation(
    user: string,
    correoUsuario: string,
    rolId: string,
    inquilinoId: string,
  ) {
    const token = generateTokenInvitation(correoUsuario, rolId, inquilinoId);
    const url = `http://localhost:5173/auth/register-users?token=${token}`;
    await this.mailerService.sendMail({
      to: correoUsuario,
      subject: 'Invitacion Enerley',
      template: './invitation',
      context: {
        name: user,
        rolId,
        url,
      },
    });
  }

  //Arreglar campos
  async sendConfirmation(token: string, correoUsuario: string) {
    const url = `http://localhost:5173/auth/confirm-account`;

    await this.mailerService.sendMail({
      to: correoUsuario,
      subject: 'Confirmación Cuenta Enerley',
      template: './confirmation',
      context: {
        token,
        url,
      },
    });
  }
}
