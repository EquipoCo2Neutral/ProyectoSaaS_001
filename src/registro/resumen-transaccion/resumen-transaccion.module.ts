import { Module } from '@nestjs/common';
import { ResumenTransaccionService } from './resumen-transaccion.service';
import { ResumenTransaccionController } from './resumen-transaccion.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ResumenTransaccion } from './entities/resumen-transaccion.entity';
import { Energetico } from 'src/complementos/energia/energeticos/entities/energetico.entity';
import { Unidade } from 'src/complementos/energia/unidades/entities/unidade.entity';
import { MesProceso } from 'src/gestor/mes-proceso/entities/mes-proceso.entity';
import { Inquilino } from 'src/administracion/inquilino/entities/inquilino.entity';
import { Proceso } from 'src/gestor/proceso/entities/proceso.entity';
import { Planta } from 'src/administracion/planta/entities/planta.entity';
import { CategoriaRegistro } from 'src/complementos/energia/categoria-registro/entities/categoria-registro.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      ResumenTransaccion,
      Energetico,
      Unidade,
      MesProceso,
      Inquilino,
      Proceso,
      Planta,
      CategoriaRegistro,
    ]),
  ],
  controllers: [ResumenTransaccionController],
  providers: [ResumenTransaccionService],
  exports: [ResumenTransaccionService],
})
export class ResumenTransaccionModule {}
