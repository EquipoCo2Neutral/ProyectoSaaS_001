import { Module } from '@nestjs/common';
import { VentaEnergeticoService } from './venta-energetico.service';
import { VentaEnergeticoController } from './venta-energetico.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VentaEnergetico } from './entities/venta-energetico.entity';
import { MesProceso } from 'src/gestor/mes-proceso/entities/mes-proceso.entity';
import { Energetico } from 'src/complementos/energia/energeticos/entities/energetico.entity';
import { Unidade } from 'src/complementos/energia/unidades/entities/unidade.entity';
import { Regiones } from 'src/complementos/regiones/entities/regione.entity';
import { SectorEconomico } from 'src/complementos/energia/sector-economico/entities/sector-economico.entity';
import { SubSectorEconomico } from 'src/complementos/energia/sub-sector-economico/entities/sub-sector-economico.entity';
import { ResumenTransaccion } from '../resumen-transaccion/entities/resumen-transaccion.entity';
import { ResumenTransaccionModule } from '../resumen-transaccion/resumen-transaccion.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      VentaEnergetico,
      MesProceso,
      Energetico,
      Unidade,
      Regiones,
      SectorEconomico,
      SubSectorEconomico,
      ResumenTransaccion,
    ]),
    ResumenTransaccionModule,
  ],
  controllers: [VentaEnergeticoController],
  providers: [VentaEnergeticoService],
})
export class VentaEnergeticoModule {}
