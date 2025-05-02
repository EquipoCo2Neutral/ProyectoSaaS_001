import { Module } from '@nestjs/common';
import { EnergeticosService } from './energeticos.service';
import { EnergeticosController } from './energeticos.controller';
import { Type } from 'class-transformer';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Energetico } from './entities/energetico.entity';
import { GrupoEnergetico } from '../grupo-energetico/entities/grupo-energetico.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Energetico, GrupoEnergetico])],
  controllers: [EnergeticosController],
  providers: [EnergeticosService],
})
export class EnergeticosModule {}
