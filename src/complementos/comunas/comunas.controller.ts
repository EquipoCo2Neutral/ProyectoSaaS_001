import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { ComunasService } from './comunas.service';
import { CreateComunaDto } from './dto/create-comuna.dto';
import { UpdateComunaDto } from './dto/update-comuna.dto';
import { query } from 'express';
import { GetComunaQueryDto } from './dto/get-comuna.dto';

@Controller('comunas')
export class ComunasController {
  constructor(private readonly comunasService: ComunasService) {}

  @Post()
  create(@Body() createComunaDto: CreateComunaDto) {
    return this.comunasService.create(createComunaDto);
  }

  @Get()
  findAll(@Query() query: GetComunaQueryDto) {
    const region = query.region_id ? +query.region_id : 0;
    return this.comunasService.findAll(region);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.comunasService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateComunaDto: UpdateComunaDto) {
    return this.comunasService.update(+id, updateComunaDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.comunasService.remove(+id);
  }
}
