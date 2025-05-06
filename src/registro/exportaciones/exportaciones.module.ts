import { Module } from '@nestjs/common';
import { ExportacionesService } from './exportaciones.service';
import { ExportacionesController } from './exportaciones.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Exportacione } from './entities/exportacione.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Exportacione])],
  controllers: [ExportacionesController],
  providers: [ExportacionesService],
})
export class ExportacionesModule {}
