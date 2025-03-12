import { Module } from '@nestjs/common';
import { RegionesService } from './regiones.service';
import { RegionesController } from './regiones.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Regiones } from './entities/regione.entity';
import { Pais } from '../paises/entities/paise.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Regiones, Pais])],
  controllers: [RegionesController],
  providers: [RegionesService],
})
export class RegionesModule {}
