import { Module } from '@nestjs/common';
import { EquipoSaassService } from './equipo-saass.service';
import { EquipoSaassController } from './equipo-saass.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EquipoSaass } from './entities/equipo-saass.entity';
import { Rol } from '../rol/entities/rol.entity';

@Module({
  imports: [TypeOrmModule.forFeature([EquipoSaass, Rol])],
  controllers: [EquipoSaassController],
  providers: [EquipoSaassService],
  exports: [EquipoSaassService],
})
export class EquipoSaassModule {}
