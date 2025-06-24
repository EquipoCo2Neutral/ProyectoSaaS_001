import { Module } from '@nestjs/common';
import { ProcesoService } from './proceso.service';
import { ProcesoController } from './proceso.controller';
import { Type } from 'class-transformer';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Proceso } from './entities/proceso.entity';
import { Planta } from 'src/administracion/planta/entities/planta.entity';
import { Mese } from 'src/complementos/meses/entities/mese.entity';
import { MesProceso } from '../mes-proceso/entities/mes-proceso.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Proceso, Planta, Mese, MesProceso])],
  controllers: [ProcesoController],
  providers: [ProcesoService],
  exports: [ProcesoService],
})
export class ProcesoModule {}
