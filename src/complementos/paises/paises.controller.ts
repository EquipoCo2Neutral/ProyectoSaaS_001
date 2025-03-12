import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
} from '@nestjs/common';
import { PaisesService } from './paises.service';
import { CreatePaiseDto } from './dto/create-paise.dto';
import { UpdatePaiseDto } from './dto/update-paise.dto';
import { IdValidacionPipe } from 'src/common/pipes/id-validacion/id-validacion.pipe';

/* El controlador es la primera capa que recibe las peticiones http */

/*
Pipes
Los pipes son una característica importante en Nest.js. Se utilizan para transformar los datos antes de que lleguen a los controladores. Los pipes se pueden usar para validar los datos, transformar los datos, y más. Los pipes se pueden usar en los controladores, en los servicios, y en los DTOs.

Son componentes para transformar y validar datos en las solicitudes entrantes.
 */

@Controller('paises')
export class PaisesController {
  constructor(private readonly paisesService: PaisesService) {}

  @Post()
  create(@Body() createPaiseDto: CreatePaiseDto) {
    return this.paisesService.create(createPaiseDto);
  }

  @Get()
  findAll() {
    return this.paisesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', IdValidacionPipe) id: string) {
    return this.paisesService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id', IdValidacionPipe) id: string,
    @Body() updatePaiseDto: UpdatePaiseDto,
  ) {
    console.log(id);
    console.log(updatePaiseDto);
    return this.paisesService.update(+id, updatePaiseDto);
  }

  @Delete(':id')
  remove(@Param('id', IdValidacionPipe) id: string) {
    return this.paisesService.remove(+id);
  }
}
