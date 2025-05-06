import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { SectorEconomicoService } from './sector-economico.service';
import { CreateSectorEconomicoDto } from './dto/create-sector-economico.dto';
import { UpdateSectorEconomicoDto } from './dto/update-sector-economico.dto';

@Controller('sector-economico')
export class SectorEconomicoController {
  constructor(private readonly sectorEconomicoService: SectorEconomicoService) {}

  @Post()
  create(@Body() createSectorEconomicoDto: CreateSectorEconomicoDto) {
    return this.sectorEconomicoService.create(createSectorEconomicoDto);
  }

  @Get()
  findAll() {
    return this.sectorEconomicoService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.sectorEconomicoService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSectorEconomicoDto: UpdateSectorEconomicoDto) {
    return this.sectorEconomicoService.update(+id, updateSectorEconomicoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.sectorEconomicoService.remove(+id);
  }
}
