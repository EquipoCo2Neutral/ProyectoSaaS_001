import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { VentaEnergeticoService } from './venta-energetico.service';
import { CreateVentaEnergeticoDto } from './dto/create-venta-energetico.dto';
import { UpdateVentaEnergeticoDto } from './dto/update-venta-energetico.dto';

@Controller('venta-energetico')
export class VentaEnergeticoController {
  constructor(private readonly ventaEnergeticoService: VentaEnergeticoService) {}

  @Post()
  create(@Body() createVentaEnergeticoDto: CreateVentaEnergeticoDto) {
    return this.ventaEnergeticoService.create(createVentaEnergeticoDto);
  }

  @Get()
  findAll() {
    return this.ventaEnergeticoService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.ventaEnergeticoService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateVentaEnergeticoDto: UpdateVentaEnergeticoDto) {
    return this.ventaEnergeticoService.update(+id, updateVentaEnergeticoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.ventaEnergeticoService.remove(+id);
  }
}
