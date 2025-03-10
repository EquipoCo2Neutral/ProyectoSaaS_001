import { Module } from '@nestjs/common';
import { PaisesService } from './paises.service';
import { PaisesController } from './paises.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Pais } from './entities/paise.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Pais])],
  controllers: [PaisesController],
  providers: [PaisesService],
})
export class PaisesModule {}
