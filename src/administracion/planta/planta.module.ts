import { Module } from '@nestjs/common';
import { PlantaService } from './planta.service';
import { PlantaController } from './planta.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Planta } from './entities/planta.entity';
import { Inquilino } from '../inquilino/entities/inquilino.entity';
import { Usuario } from '../usuario/entities/usuario.entity';
import { Comuna } from 'src/complementos/comunas/entities/comuna.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Planta, Inquilino, Usuario, Comuna])],
  controllers: [PlantaController],
  providers: [PlantaService],
  exports: [PlantaService],
})
export class PlantaModule {}
