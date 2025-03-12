import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ComunasService } from './comunas.service';
import { CreateComunaDto } from './dto/create-comuna.dto';
import { UpdateComunaDto } from './dto/update-comuna.dto';

@Controller('comunas')
export class ComunasController {
  constructor(private readonly comunasService: ComunasService) {}

  @Post()
  create(@Body() createComunaDto: CreateComunaDto) {
    return this.comunasService.create(createComunaDto);
  }

  @Get()
  findAll() {
    return this.comunasService.findAll();
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
