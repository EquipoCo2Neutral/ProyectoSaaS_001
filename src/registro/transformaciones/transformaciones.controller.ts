import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { TransformacionesService } from './transformaciones.service';
import { CreateTransformacioneDto } from './dto/create-transformacione.dto';
import { UpdateTransformacioneDto } from './dto/update-transformacione.dto';

@Controller('transformacion')
export class TransformacionesController {
  constructor(
    private readonly transformacionesService: TransformacionesService,
  ) {}

  @Post()
  create(@Body() createTransformacioneDto: CreateTransformacioneDto) {
    return this.transformacionesService.create(createTransformacioneDto);
  }

  @Get()
  findAll() {
    return this.transformacionesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.transformacionesService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateTransformacioneDto: UpdateTransformacioneDto,
  ) {
    return this.transformacionesService.update(+id, updateTransformacioneDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.transformacionesService.remove(+id);
  }
}
