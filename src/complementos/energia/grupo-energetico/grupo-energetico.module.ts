import { Module } from '@nestjs/common';
import { GrupoEnergeticoService } from './grupo-energetico.service';
import { GrupoEnergeticoController } from './grupo-energetico.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GrupoEnergetico } from './entities/grupo-energetico.entity';

@Module({
  imports: [TypeOrmModule.forFeature([GrupoEnergetico])],
  controllers: [GrupoEnergeticoController],
  providers: [GrupoEnergeticoService],
})
export class GrupoEnergeticoModule {}
