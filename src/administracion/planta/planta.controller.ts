import { Controller, Get, Post, Body, Patch, Param, Delete, BadRequestException, Query } from '@nestjs/common';
import { PlantaService } from './planta.service';
import { CreatePlantaDto } from './dto/create-planta.dto';
import { UpdatePlantaDto } from './dto/update-planta.dto';

@Controller('planta')
export class PlantaController {
  constructor(private readonly plantaService: PlantaService) {}

  @Post()
  create(@Body() createPlantaDto: CreatePlantaDto) {
    return this.plantaService.create(createPlantaDto);
  }

  @Get()
  findAll(@Query('inquilinoId') inquilino: string) {
    if (!inquilino) {
      throw new BadRequestException('inquilinoId es requerido');
    }
    const inquilinoId = inquilino ? inquilino: null;
    return this.plantaService.findAll(inquilinoId);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.plantaService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePlantaDto: UpdatePlantaDto) {
    return this.plantaService.update(id, updatePlantaDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.plantaService.remove(id);
  }
}
