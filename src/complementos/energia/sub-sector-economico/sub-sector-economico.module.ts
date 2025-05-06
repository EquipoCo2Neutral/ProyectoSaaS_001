import { Module } from '@nestjs/common';
import { SubSectorEconomicoService } from './sub-sector-economico.service';
import { SubSectorEconomicoController } from './sub-sector-economico.controller';
import { SubSectorEconomico } from './entities/sub-sector-economico.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([SubSectorEconomico])],
  controllers: [SubSectorEconomicoController],
  providers: [SubSectorEconomicoService],
})
export class SubSectorEconomicoModule {}
