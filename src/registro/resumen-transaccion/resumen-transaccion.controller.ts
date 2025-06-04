import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  BadRequestException,
} from '@nestjs/common';
import { ResumenTransaccionService } from './resumen-transaccion.service';
import { CreateResumenTransaccionDto } from './dto/create-resumen-transaccion.dto';
import { UpdateResumenTransaccionDto } from './dto/update-resumen-transaccion.dto';
import { EnergeticoTotalDto } from './dto/energetico-total.dto';

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
    return this.resumenTransaccionService.updateRT(
      +id,
      updateResumenTransaccionDto,
    );
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.resumenTransaccionService.removeRT(+id);
  }

  // Endpoint para obtener los totales de energeticos agrupados por planta y proceso
  @Get('energeticos/agrupados/totales')
  async getEnergeticosAgrupados(
    @Query('idPlanta') idPlanta: string,
    @Query('idProceso') idProceso: string
  ) {
    try {
      if (!idPlanta || !idProceso) {
        throw new BadRequestException('Se requieren idPlanta e idProceso');
      }
      
      return this.resumenTransaccionService.getEnergeticosAgrupadosTotales(
        idPlanta,
        idProceso
      );
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  // Endpoint para obtener los totales de energeticos agrupados por entrada

  @Get('energeticos/agrupados/entrada')
  async getEnergeticosAgrupadosEntrada(
    @Query('idPlanta') idPlanta: string,
    @Query('idProceso') idProceso: string
  ) {
    try {
      if (!idPlanta || !idProceso) {
        throw new BadRequestException('Se requieren idPlanta e idProceso');
      }
      
      return this.resumenTransaccionService.getEnergeticosAgrupadosEntrada(
        idPlanta,
        idProceso
      );
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  // Endpoint para obtener los totales de energeticos agrupados por salida
    @Get('energeticos/agrupados/salida')
  async getEnergeticosAgrupadosSalida(
    @Query('idPlanta') idPlanta: string,
    @Query('idProceso') idProceso: string
  ) {
    try {
      if (!idPlanta || !idProceso) {
        throw new BadRequestException('Se requieren idPlanta e idProceso');
      }
      
      return this.resumenTransaccionService.getEnergeticosAgrupadosSalida(
        idPlanta,
        idProceso
      );
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

    // Endpoint para obtener teracalorias totales
    @Get('energeticos/teracalorias')
  async getTeraCalorias(
    @Query('idPlanta') idPlanta: string,
    @Query('idProceso') idProceso: string
  ) {
    try {
      if (!idPlanta || !idProceso) {
        throw new BadRequestException('Se requieren idPlanta e idProceso');
      }
      
      return this.resumenTransaccionService.getTeraCalorias(
        idPlanta,
        idProceso
      );
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

}
