import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AdquisicionesService } from './adquisiciones.service';
import { CreateAdquisicioneDto } from './dto/create-adquisicione.dto';
import { UpdateAdquisicioneDto } from './dto/update-adquisicione.dto';

@Controller('adquisiciones')
export class AdquisicionesController {
  constructor(private readonly adquisicionesService: AdquisicionesService) {}

  @Post()
  create(@Body() createAdquisicioneDto: CreateAdquisicioneDto) {
    return this.adquisicionesService.create(createAdquisicioneDto);
  }

  @Get()
  findAll() {
    return this.adquisicionesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.adquisicionesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAdquisicioneDto: UpdateAdquisicioneDto) {
    return this.adquisicionesService.update(+id, updateAdquisicioneDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.adquisicionesService.remove(+id);
  }
}
