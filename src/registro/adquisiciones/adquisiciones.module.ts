import { Module } from '@nestjs/common';
import { AdquisicionesService } from './adquisiciones.service';
import { AdquisicionesController } from './adquisiciones.controller';
import { Adquisicione } from './entities/adquisicione.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MesProceso } from 'src/gestor/mes-proceso/entities/mes-proceso.entity';
import { Transaccione } from 'src/complementos/energia/transacciones/entities/transaccione.entity';
import { GrupoEnergetico } from 'src/complementos/energia/grupo-energetico/entities/grupo-energetico.entity';
import { Energetico } from 'src/complementos/energia/energeticos/entities/energetico.entity';
import { Unidade } from 'src/complementos/energia/unidades/entities/unidade.entity';
import { Pais } from 'src/complementos/paises/entities/paise.entity';
import { ResumenTransaccion } from '../resumen-transaccion/entities/resumen-transaccion.entity';
import { ResumenTransaccionModule } from '../resumen-transaccion/resumen-transaccion.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Adquisicione,
      MesProceso,
      Transaccione,
      GrupoEnergetico,
      Energetico,
      Unidade,
      Pais,
      ResumenTransaccion,
    ]),
    ResumenTransaccionModule,
  ],
  controllers: [AdquisicionesController],
  providers: [AdquisicionesService],
})
export class AdquisicionesModule {}
