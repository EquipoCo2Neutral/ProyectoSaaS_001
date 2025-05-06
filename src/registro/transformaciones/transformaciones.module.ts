import { Module } from '@nestjs/common';
import { TransformacionesService } from './transformaciones.service';
import { TransformacionesController } from './transformaciones.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Transformacione } from './entities/transformacione.entity';
import { MesProceso } from 'src/gestor/mes-proceso/entities/mes-proceso.entity';
import { Energetico } from 'src/complementos/energia/energeticos/entities/energetico.entity';
import { Unidade } from 'src/complementos/energia/unidades/entities/unidade.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Transformacione,
      MesProceso,
      Energetico,
      Unidade,
    ]),
  ],
  controllers: [TransformacionesController],
  providers: [TransformacionesService],
})
export class TransformacionesModule {}
