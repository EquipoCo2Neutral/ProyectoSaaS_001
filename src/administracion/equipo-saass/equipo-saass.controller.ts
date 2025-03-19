import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { EquipoSaassService } from './equipo-saass.service';
import { CreateEquipoSaassDto } from './dto/create-equipo-saass.dto';
import { UpdateEquipoSaassDto } from './dto/update-equipo-saass.dto';

@Controller('equipo-saas')
export class EquipoSaassController {
  constructor(private readonly equipoSaassService: EquipoSaassService) {}

  @Post()
  create(@Body() createEquipoSaassDto: CreateEquipoSaassDto) {
    return this.equipoSaassService.create(createEquipoSaassDto);
  }

  @Get()
  findAll() {
    return this.equipoSaassService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.equipoSaassService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateEquipoSaassDto: UpdateEquipoSaassDto,
  ) {
    return this.equipoSaassService.update(id, updateEquipoSaassDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.equipoSaassService.remove(id);
  }
}
