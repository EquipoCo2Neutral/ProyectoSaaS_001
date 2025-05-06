import { Module } from '@nestjs/common';
import { SectorEconomicoService } from './sector-economico.service';
import { SectorEconomicoController } from './sector-economico.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SectorEconomico } from './entities/sector-economico.entity';

@Module({
  imports: [TypeOrmModule.forFeature([SectorEconomico])],
  controllers: [SectorEconomicoController],
  providers: [SectorEconomicoService],
})
export class SectorEconomicoModule {}
