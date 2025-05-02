import { Module } from '@nestjs/common';
import { GeneracionService } from './generacion.service';
import { GeneracionController } from './generacion.controller';
import { Generacion } from './entities/generacion.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MesProceso } from 'src/gestor/mes-proceso/entities/mes-proceso.entity';
import { Energetico } from 'src/complementos/energia/energeticos/entities/energetico.entity';
import { Unidade } from 'src/complementos/energia/unidades/entities/unidade.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Generacion, MesProceso, Energetico, Unidade])],
  controllers: [GeneracionController],
  providers: [GeneracionService],
})
export class GeneracionModule {}
