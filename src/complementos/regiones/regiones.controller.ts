import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { RegionesService } from './regiones.service';
import { CreateRegioneDto } from './dto/create-regione.dto';
import { UpdateRegioneDto } from './dto/update-regione.dto';

@Controller('regiones')
export class RegionesController {
  constructor(private readonly regionesService: RegionesService) {}

  @Post()
  create(@Body() createRegioneDto: CreateRegioneDto) {
    return this.regionesService.create(createRegioneDto);
  }

  @Get()
  findAll() {
    return this.regionesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.regionesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateRegioneDto: UpdateRegioneDto) {
    return this.regionesService.update(+id, updateRegioneDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.regionesService.remove(+id);
  }
}
