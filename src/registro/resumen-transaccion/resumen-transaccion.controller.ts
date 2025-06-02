import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ResumenTransaccionService } from './resumen-transaccion.service';
import { CreateResumenTransaccionDto } from './dto/create-resumen-transaccion.dto';
import { UpdateResumenTransaccionDto } from './dto/update-resumen-transaccion.dto';

@Controller('resumen-transaccion')
export class ResumenTransaccionController {
  constructor(
    private readonly resumenTransaccionService: ResumenTransaccionService,
  ) {}

  @Post()
  create(@Body() createResumenTransaccionDto: CreateResumenTransaccionDto) {
    return this.resumenTransaccionService.createRT(createResumenTransaccionDto);
  }

  @Get()
  findAll() {
    return this.resumenTransaccionService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.resumenTransaccionService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateResumenTransaccionDto: UpdateResumenTransaccionDto,
  ) {
    return this.resumenTransaccionService.update(
      +id,
      updateResumenTransaccionDto,
    );
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.resumenTransaccionService.remove(+id);
  }
}
