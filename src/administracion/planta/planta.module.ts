import { Module } from '@nestjs/common';
import { PlantaService } from './planta.service';
import { PlantaController } from './planta.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Planta } from './entities/planta.entity';
import { Inquilino } from '../inquilino/entities/inquilino.entity';
import { Usuario } from '../usuario/entities/usuario.entity';
import { Comuna } from 'src/complementos/comunas/entities/comuna.entity';
import { Proceso } from 'src/gestor/proceso/entities/proceso.entity';
import { MesProceso } from 'src/gestor/mes-proceso/entities/mes-proceso.entity';
import { Adquisicione } from 'src/registro/adquisiciones/entities/adquisicione.entity';
import { Generacion } from 'src/registro/generacion/entities/generacion.entity';
import { Transformacione } from 'src/registro/transformaciones/entities/transformacione.entity';
import { UsosFinale } from 'src/registro/usos-finales/entities/usos-finale.entity';
import { VentaElectricidad } from 'src/registro/venta-electricidad/entities/venta-electricidad.entity';
import { VentaEnergetico } from 'src/registro/venta-energetico/entities/venta-energetico.entity';
import { Exportacione } from 'src/registro/exportaciones/entities/exportacione.entity';
import { ResumenTransaccion } from 'src/registro/resumen-transaccion/entities/resumen-transaccion.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Planta,
      Inquilino,
      Usuario,
      Comuna,
      Proceso,
      MesProceso,
      Adquisicione,
      Generacion,
      Transformacione,
      UsosFinale,
      VentaElectricidad,
      VentaEnergetico,
      Exportacione,
      ResumenTransaccion,
    ]),
  ],
  controllers: [PlantaController],
  providers: [PlantaService],
  exports: [PlantaService],
})
export class PlantaModule {}
