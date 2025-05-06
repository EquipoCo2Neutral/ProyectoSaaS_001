import { Module } from '@nestjs/common';
import { TipoUfService } from './tipo-uf.service';
import { TipoUfController } from './tipo-uf.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TipoUf } from './entities/tipo-uf.entity';

@Module({
  imports: [TypeOrmModule.forFeature([TipoUf])],
  controllers: [TipoUfController],
  providers: [TipoUfService],
})
export class TipoUfModule {}
