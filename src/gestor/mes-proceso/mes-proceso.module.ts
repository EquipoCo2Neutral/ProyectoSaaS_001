import { Module } from '@nestjs/common';
import { MesProcesoService } from './mes-proceso.service';
import { MesProcesoController } from './mes-proceso.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MesProceso } from './entities/mes-proceso.entity';
import { Proceso } from '../proceso/entities/proceso.entity';
import { Mese } from 'src/complementos/meses/entities/mese.entity';

@Module({
  imports: [TypeOrmModule.forFeature([MesProceso, Proceso, Mese])],
  controllers: [MesProcesoController],
  providers: [MesProcesoService],
})
export class MesProcesoModule {}
