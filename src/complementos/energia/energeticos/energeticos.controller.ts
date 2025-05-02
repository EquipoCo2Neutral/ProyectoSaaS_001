import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { EnergeticosService } from './energeticos.service';
import { CreateEnergeticoDto } from './dto/create-energetico.dto';
import { UpdateEnergeticoDto } from './dto/update-energetico.dto';

@Controller('energeticos')
export class EnergeticosController {
  constructor(private readonly energeticosService: EnergeticosService) {}

  @Post()
  create(@Body() createEnergeticoDto: CreateEnergeticoDto) {
    return this.energeticosService.create(createEnergeticoDto);
  }

  @Get()
  findAll() {
    return this.energeticosService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.energeticosService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateEnergeticoDto: UpdateEnergeticoDto) {
    return this.energeticosService.update(+id, updateEnergeticoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.energeticosService.remove(+id);
  }
}
