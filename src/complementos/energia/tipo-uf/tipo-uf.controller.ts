import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TipoUfService } from './tipo-uf.service';
import { CreateTipoUfDto } from './dto/create-tipo-uf.dto';
import { UpdateTipoUfDto } from './dto/update-tipo-uf.dto';

@Controller('tipo-uf')
export class TipoUfController {
  constructor(private readonly tipoUfService: TipoUfService) {}

  @Post()
  create(@Body() createTipoUfDto: CreateTipoUfDto) {
    return this.tipoUfService.create(createTipoUfDto);
  }

  @Get()
  findAll() {
    return this.tipoUfService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.tipoUfService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTipoUfDto: UpdateTipoUfDto) {
    return this.tipoUfService.update(+id, updateTipoUfDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.tipoUfService.remove(+id);
  }
}
