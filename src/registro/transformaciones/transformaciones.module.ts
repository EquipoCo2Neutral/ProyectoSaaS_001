import { Module } from '@nestjs/common';
import { TransformacionesService } from './transformaciones.service';
import { TransformacionesController } from './transformaciones.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Transformacione } from './entities/transformacione.entity';
import { MesProceso } from 'src/gestor/mes-proceso/entities/mes-proceso.entity';
import { Energetico } from 'src/complementos/energia/energeticos/entities/energetico.entity';
import { Unidade } from 'src/complementos/energia/unidades/entities/unidade.entity';
import { ResumenTransaccion } from '../resumen-transaccion/entities/resumen-transaccion.entity';
import { ResumenTransaccionModule } from '../resumen-transaccion/resumen-transaccion.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Transformacione,
      MesProceso,
      Energetico,
      Unidade,
      ResumenTransaccion,
    ]),
    ResumenTransaccionModule
  ],
  controllers: [TransformacionesController],
  providers: [TransformacionesService],
})
export class TransformacionesModule {}
