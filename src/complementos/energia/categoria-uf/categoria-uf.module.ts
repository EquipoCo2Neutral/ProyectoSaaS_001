import { Module } from '@nestjs/common';
import { CategoriaUfService } from './categoria-uf.service';
import { CategoriaUfController } from './categoria-uf.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoriaUf } from './entities/categoria-uf.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CategoriaUf])],
  controllers: [CategoriaUfController],
  providers: [CategoriaUfService],
})
export class CategoriaUfModule {}
