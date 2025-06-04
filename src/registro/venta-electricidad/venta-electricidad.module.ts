import { Module } from '@nestjs/common';
import { VentaElectricidadService } from './venta-electricidad.service';
import { VentaElectricidadController } from './venta-electricidad.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VentaElectricidad } from './entities/venta-electricidad.entity';
import { MesProceso } from 'src/gestor/mes-proceso/entities/mes-proceso.entity';
import { Regiones } from 'src/complementos/regiones/entities/regione.entity';
import { SectorEconomico } from 'src/complementos/energia/sector-economico/entities/sector-economico.entity';
import { SubSectorEconomico } from 'src/complementos/energia/sub-sector-economico/entities/sub-sector-economico.entity';
import { Unidade } from 'src/complementos/energia/unidades/entities/unidade.entity';
import { ResumenTransaccion } from '../resumen-transaccion/entities/resumen-transaccion.entity';
import { ResumenTransaccionModule } from '../resumen-transaccion/resumen-transaccion.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      VentaElectricidad,
      MesProceso,
      Regiones,
      SectorEconomico,
      SubSectorEconomico,
      Unidade,
      ResumenTransaccion,
    ]),
    ResumenTransaccionModule,
  ],
  controllers: [VentaElectricidadController],
  providers: [VentaElectricidadService],
})
export class VentaElectricidadModule {}
