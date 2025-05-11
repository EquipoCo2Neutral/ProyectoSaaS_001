import { Module } from '@nestjs/common';
import { ExportacionesService } from './exportaciones.service';
import { ExportacionesController } from './exportaciones.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Exportacione } from './entities/exportacione.entity';
import { MesProceso } from 'src/gestor/mes-proceso/entities/mes-proceso.entity';
import { Energetico } from 'src/complementos/energia/energeticos/entities/energetico.entity';
import { Unidade } from 'src/complementos/energia/unidades/entities/unidade.entity';
import { Pais } from 'src/complementos/paises/entities/paise.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Exportacione,
      MesProceso,
      Energetico,
      Unidade,
      Pais,
    ]),
  ],
  controllers: [ExportacionesController],
  providers: [ExportacionesService],
})
export class ExportacionesModule {}
