import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ResumenTransaccionesService } from './resumen-transacciones.service';
import { CreateResumenTransaccioneDto } from './dto/create-resumen-transaccione.dto';
import { UpdateResumenTransaccioneDto } from './dto/update-resumen-transaccione.dto';
import { ResumenTransaccione } from './entities/resumen-transaccione.entity';
import { Adquisicione } from '../adquisiciones/entities/adquisicione.entity';

@Controller('resumen-transacciones')
export class ResumenTransaccionesController {
  constructor(private readonly resumenTransaccionesService: ResumenTransaccionesService) {}

  @Post()
  create(@Body() createResumenTransaccioneDto: CreateResumenTransaccioneDto) {
    return this.resumenTransaccionesService.create(createResumenTransaccioneDto);
  }

  @Get()
  findAll() {
    return this.resumenTransaccionesService.findAll();
  }

  @Get(':id')
  async getSummary(@Param('id') id:string){
    return this.resumenTransaccionesService.createResumenTransaccione(id);
  }


  @Patch(':id')
  update(@Param('id') id: string, @Body() updateResumenTransaccioneDto: UpdateResumenTransaccioneDto) {
    return this.resumenTransaccionesService.update(+id, updateResumenTransaccioneDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.resumenTransaccionesService.remove(+id);
  }
}
