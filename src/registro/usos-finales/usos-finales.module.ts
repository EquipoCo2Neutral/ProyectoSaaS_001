import { Module } from '@nestjs/common';
import { UsosFinalesService } from './usos-finales.service';
import { UsosFinalesController } from './usos-finales.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsosFinale } from './entities/usos-finale.entity';
import { Energetico } from 'src/complementos/energia/energeticos/entities/energetico.entity';
import { CategoriaUf } from 'src/complementos/energia/categoria-uf/entities/categoria-uf.entity';
import { TipoUf } from 'src/complementos/energia/tipo-uf/entities/tipo-uf.entity';
import { Unidade } from 'src/complementos/energia/unidades/entities/unidade.entity';
import { MesProceso } from 'src/gestor/mes-proceso/entities/mes-proceso.entity';
import { ResumenTransaccion } from '../resumen-transaccion/entities/resumen-transaccion.entity';
import { ResumenTransaccionModule } from '../resumen-transaccion/resumen-transaccion.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      UsosFinale,
      Energetico,
      CategoriaUf,
      TipoUf,
      Unidade,
      MesProceso,
      ResumenTransaccion
    ]),
    ResumenTransaccionModule
  ],
  controllers: [UsosFinalesController],
  providers: [UsosFinalesService],
})
export class UsosFinalesModule {}
