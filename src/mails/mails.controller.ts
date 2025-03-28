import { Body, Controller, Post } from '@nestjs/common';
import { MailsService } from './mails.service';
import { User } from 'src/interfaces/user';
import { SendConfirmationDto } from './dto/sendConfirmation.dto';

@Controller('send')
export class MailsController {
  constructor(private readonly mailsService: MailsService) {}

  @Post('confirmation')
  create(@Body() sendConfirmationDto: SendConfirmationDto) {
    const { token, correoUsuario } = sendConfirmationDto;
    return this.mailsService.sendConfirmation(token, correoUsuario);
  }
}
