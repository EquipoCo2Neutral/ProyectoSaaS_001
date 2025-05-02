import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { GrupoEnergeticoService } from './grupo-energetico.service';
import { CreateGrupoEnergeticoDto } from './dto/create-grupo-energetico.dto';
import { UpdateGrupoEnergeticoDto } from './dto/update-grupo-energetico.dto';

@Controller('grupo-energetico')
export class GrupoEnergeticoController {
  constructor(private readonly grupoEnergeticoService: GrupoEnergeticoService) {}

  @Post()
  create(@Body() createGrupoEnergeticoDto: CreateGrupoEnergeticoDto) {
    return this.grupoEnergeticoService.create(createGrupoEnergeticoDto);
  }

  @Get()
  findAll() {
    return this.grupoEnergeticoService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.grupoEnergeticoService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateGrupoEnergeticoDto: UpdateGrupoEnergeticoDto) {
    return this.grupoEnergeticoService.update(+id, updateGrupoEnergeticoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.grupoEnergeticoService.remove(+id);
  }
}
