import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { MesesService } from './meses.service';

@Controller('meses')
export class MesesController {
  constructor(private readonly mesesService: MesesService) {}

  @Get()
  findAll() {
    return this.mesesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.mesesService.findOne(+id);
  }
}
