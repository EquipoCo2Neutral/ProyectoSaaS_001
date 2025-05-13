import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ExportacionesService } from './exportaciones.service';
import { CreateExportacioneDto } from './dto/create-exportacione.dto';
import { UpdateExportacioneDto } from './dto/update-exportacione.dto';

@Controller('exportaciones')
export class ExportacionesController {
  constructor(private readonly exportacionesService: ExportacionesService) {}

  @Post()
  create(@Body() createExportacioneDto: CreateExportacioneDto) {
    return this.exportacionesService.create(createExportacioneDto);
  }

  @Get("/listar/:id")
  findAll(@Param('id') id: string) {
    return this.exportacionesService.findAll(id);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.exportacionesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateExportacioneDto: UpdateExportacioneDto) {
    return this.exportacionesService.update(+id, updateExportacioneDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.exportacionesService.remove(+id);
  }
}
