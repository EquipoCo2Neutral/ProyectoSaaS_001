import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { MesProcesoService } from './mes-proceso.service';
import { CreateMesProcesoDto } from './dto/create-mes-proceso.dto';
import { UpdateMesProcesoDto } from './dto/update-mes-proceso.dto';

@Controller('mes-proceso')
export class MesProcesoController {
  constructor(private readonly mesProcesoService: MesProcesoService) {}

  @Post()
  create(@Body() createMesProcesoDto: CreateMesProcesoDto) {
    return this.mesProcesoService.create(createMesProcesoDto);
  }

  @Get()
  findAll() {
    return this.mesProcesoService.findAll();
  }

  @Get('proceso/:idProceso')
  findAllByProceso(@Param('idProceso') idProceso: string) {
    return this.mesProcesoService.findAllByProcesoId(idProceso);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.mesProcesoService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateMesProcesoDto: UpdateMesProcesoDto,
  ) {
    return this.mesProcesoService.update(+id, updateMesProcesoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.mesProcesoService.remove(+id);
  }

  // Eliminar todos los meses descartados de un proceso
  @Delete('meses-descartados/:idProceso')
  async eliminarMensuales(@Param('idProceso') idProceso: string) {
    return this.mesProcesoService.eliminarMensuales(idProceso);
  }

  @Delete('mes-anual-descartado/:idProceso')
  async eliminarRegistroAnual(@Param('idProceso') idProceso: string) {
    return this.mesProcesoService.eliminarRegistroAnual(idProceso);
  }
}
