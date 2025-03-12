import { Module } from '@nestjs/common';
import { InquilinoService } from './inquilino.service';
import { InquilinoController } from './inquilino.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Inquilino } from './entities/inquilino.entity';
import { Suscripcion } from '../suscripcion/entities/suscripcion.entity';


@Module({
  imports: [TypeOrmModule.forFeature([Inquilino, Suscripcion])],
  controllers: [InquilinoController],
  providers: [InquilinoService],
})
export class InquilinoModule {}
