import { Module } from '@nestjs/common';
import { ResumenTransaccionesService } from './resumen-transacciones.service';
import { ResumenTransaccionesController } from './resumen-transacciones.controller';
import { Type } from 'class-transformer';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ResumenTransaccione } from './entities/resumen-transaccione.entity';
import { MesProceso } from 'src/gestor/mes-proceso/entities/mes-proceso.entity';
import { Adquisicione } from '../adquisiciones/entities/adquisicione.entity';
import { Generacion } from '../generacion/entities/generacion.entity';
import { Transformacione } from '../transformaciones/entities/transformacione.entity';
import { UsosFinale } from '../usos-finales/entities/usos-finale.entity';
import { VentaElectricidad } from '../venta-electricidad/entities/venta-electricidad.entity';
import { VentaEnergetico } from '../venta-energetico/entities/venta-energetico.entity';
import { Exportacione } from '../exportaciones/entities/exportacione.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ResumenTransaccione, MesProceso, Adquisicione, Generacion, Transformacione, UsosFinale, VentaElectricidad, VentaEnergetico, Exportacione])],
  controllers: [ResumenTransaccionesController],
  providers: [ResumenTransaccionesService],
})
export class ResumenTransaccionesModule {}
