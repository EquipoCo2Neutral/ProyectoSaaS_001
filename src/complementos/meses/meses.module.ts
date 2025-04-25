import { Module } from '@nestjs/common';
import { MesesService } from './meses.service';
import { MesesController } from './meses.controller';
import { Type } from 'class-transformer';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Mese } from './entities/mese.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Mese])],
  controllers: [MesesController],
  providers: [MesesService],
})
export class MesesModule {}
