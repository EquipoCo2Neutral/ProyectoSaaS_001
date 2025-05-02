import { Module } from '@nestjs/common';
import { UnidadesService } from './unidades.service';
import { UnidadesController } from './unidades.controller';
import { Unidade } from './entities/unidade.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Energetico } from '../energeticos/entities/energetico.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Unidade,Energetico])],
  controllers: [UnidadesController],
  providers: [UnidadesService],
})
export class UnidadesModule {}
