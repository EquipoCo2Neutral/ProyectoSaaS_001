import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Put,
} from '@nestjs/common';
import { ProcesoService } from './proceso.service';
import { CreateProcesoDto } from './dto/create-proceso.dto';
import { UpdateProcesoDto } from './dto/update-proceso.dto';

@Controller('proceso')
export class ProcesoController {
  constructor(private readonly procesoService: ProcesoService) {}

  @Post()
  create(@Body() createProcesoDto: CreateProcesoDto) {
    return this.procesoService.create(createProcesoDto);
  }
  @Get('planta/:idPlanta')
  findByPlanta(@Param('idPlanta') idPlanta: string) {
    return this.procesoService.findByPlanta(idPlanta);
  }

  @Get()
  findAll() {
    return this.procesoService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.procesoService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProcesoDto: UpdateProcesoDto) {
    return this.procesoService.update(+id, updateProcesoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.procesoService.remove(+id);
  }

  @Put(':idProceso/estado')
  updateEstado(
    @Param('idProceso') idProceso: string,
    @Body('estado') estado: boolean,
  ) {
    return this.procesoService.updateEstado(idProceso, estado);
  }
}
