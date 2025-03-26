import { Body, Controller, Post } from '@nestjs/common';
import { MailsService } from './mails.service';
import { User } from 'src/interfaces/user';

@Controller('send')
export class MailsController {
  constructor(private readonly mailsService: MailsService) {}
}
