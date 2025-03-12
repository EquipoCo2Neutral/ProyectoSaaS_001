import { Module } from '@nestjs/common';
import { ComunasService } from './comunas.service';
import { ComunasController } from './comunas.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Comuna } from './entities/comuna.entity';
import { Regiones } from '../regiones/entities/regione.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Comuna, Regiones])],
  controllers: [ComunasController],
  providers: [ComunasService],
})
export class ComunasModule {}
