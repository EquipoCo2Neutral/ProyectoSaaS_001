import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { UnidadesService } from './unidades.service';
import { CreateUnidadeDto } from './dto/create-unidade.dto';
import { UpdateUnidadeDto } from './dto/update-unidade.dto';

@Controller('unidades')
export class UnidadesController {
  constructor(private readonly unidadesService: UnidadesService) {}

  @Post()
  create(@Body() createUnidadeDto: CreateUnidadeDto) {
    return this.unidadesService.create(createUnidadeDto);
  }

  @Get('by-ids')
  async findByIds(@Query('ids') ids: string) {
    const idArray = ids.split(',').map((id) => parseInt(id, 10));
    return this.unidadesService.findByIds(idArray);
  }

  @Get('energetico/:id')
  findByEnergetico(@Param('id') id: string) {
    return this.unidadesService.findAll(+id);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.unidadesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUnidadeDto: UpdateUnidadeDto) {
    return this.unidadesService.update(+id, updateUnidadeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.unidadesService.remove(+id);
  }
}
