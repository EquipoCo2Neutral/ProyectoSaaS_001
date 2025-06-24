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
import { Proceso } from './entities/proceso.entity';

@Controller('proceso')
export class ProcesoController {
  constructor(private readonly procesoService: ProcesoService) {}

  @Get(':idProceso')
  findByProceso(@Param('idProceso') idProceso: string) {
    return this.procesoService.findByProceso(idProceso);
  }
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
  findOneResumen(@Param('id') id: string) {
    return this.procesoService.findOneResumen(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProcesoDto: UpdateProcesoDto) {
    return this.procesoService.update(+id, updateProcesoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.procesoService.remove(+id);
  }

  @Patch(':id/habilitar-registro-anual')
  habilitarRegistroAnual(@Param('id') id: string): Promise<Proceso> {
    return this.procesoService.habilitarRegistroAnual(id);
  }

  @Put(':idProceso/estado')
  updateEstado(
    @Param('idProceso') idProceso: string,
    @Body('estado') estado: boolean,
  ) {
    return this.procesoService.updateEstado(idProceso, estado);
  }

  @Patch(':idProceso/cambiar-estado')
  async cambiarEstado(@Param('idProceso') idProceso: string): Promise<Proceso> {
    return this.procesoService.cambiarEstado(idProceso);
  }
}
