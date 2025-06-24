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

//-------------------------------Usado para dashboard-----START  

@Get('energeticos/agrupados/totales')
  async getEnergeticosAgrupados(
    @Query('idPlanta') idPlanta: string,
    @Query('idProceso') idProceso: string
  ) {
    try {
      if (!idPlanta || !idProceso) {
        throw new BadRequestException('Se requieren idPlanta e idProceso');
      }
      
      // Convertir en arrays y limpiar valores vacíos
      const plantas = idPlanta.split(',').filter(Boolean);
      const procesos = idProceso.split(',').filter(Boolean);
      const datos = await this.resumenTransaccionService.getEnergeticosAgrupadosTotales(
        plantas,
        procesos
      );
      return{
        total: datos.length,
        datos: datos
      }
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

@Get('energeticos/teracalorias')
async getTeraCalorias(
  @Query('idPlanta') idPlanta: string,
  @Query('idProceso') idProceso: string
) {
  try {
    if (!idPlanta || !idProceso) {
      throw new BadRequestException('Se requieren idPlanta e idProceso');
    }
    
    // Convertir en arrays y limpiar valores vacíos
    const plantas = idPlanta.split(',').filter(Boolean);
    const procesos = idProceso.split(',').filter(Boolean);

    return this.resumenTransaccionService.getTeraCalorias(
      plantas,
      procesos
    );
  } catch (error) {
    throw new BadRequestException(error.message);
  }
}

@Get('energeticos/entrada-salida')
async getEnergeticoAgrupadosEntradaSalida(
  @Query('idPlanta') idPlanta: string,
  @Query('idProceso') idProceso: string
) {
  try {
    if (!idPlanta || !idProceso) {
      throw new BadRequestException('Se requieren idPlanta e idProceso');
    }
    
    // Convertir en arrays y limpiar valores vacíos
    const plantas = idPlanta.split(',').filter(Boolean);
    const procesos = idProceso.split(',').filter(Boolean);

    return this.resumenTransaccionService.getEnergeticosAgrupadosEntradaSalida(
      plantas,
      procesos
    );
  } catch (error) {
    throw new BadRequestException(error.message);
  }
}

@Get('energeticos/conteo-id-registros')
async getConteoIdRegistrosDesdeResumenes(
  @Query('idPlanta') idPlanta: string, // Recibe string (ej: "1,2,3")
  @Query('idProceso') idProceso: string // Recibe string (ej: "A,B,C")
) {
  try {
    if (!idPlanta || !idProceso) {
      throw new BadRequestException('Se requieren idPlanta e idProceso');
    }

    // Convertir a arrays
    const plantas = idPlanta.split(',').filter(Boolean);
    const procesos = idProceso.split(',').filter(Boolean);

    return this.resumenTransaccionService.getConteoIdRegistrosDesdeResumenes(
      plantas,
      procesos
    );
  } catch (error) {
    throw new BadRequestException(error.message);
  }
}
//-------------------------------Usado para dashboard-----END



/*Para tabla resumen Transacciones */
@Get('energeticos/tabla-resumen-transacciones')
async getResumenTransaccionPorEnergetico(
  @Query('idPlanta') idPlanta: string, // Recibe string (ej: "1,2,3")
  @Query('idProceso') idProceso: string // Recibe string (ej: "A,B,C")
) {
  try {
    if (!idPlanta || !idProceso) {
      throw new BadRequestException('Se requieren idPlanta e idProceso');
    }

    // Convertir a arrays
    const plantas = idPlanta.split(',').filter(Boolean);
    const procesos = idProceso.split(',').filter(Boolean);

    const datos = await this.resumenTransaccionService.getResumenTransaccionPorEnergetico(
      plantas,
      procesos
    );

    return {
      total: datos.length,
      datos: datos
    };
  } catch (error) {
    throw new BadRequestException(error.message);
  }
}



}
