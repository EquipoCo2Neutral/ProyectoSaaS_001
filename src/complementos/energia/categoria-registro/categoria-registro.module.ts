import { Module } from '@nestjs/common';
import { CategoriaRegistroService } from './categoria-registro.service';
import { CategoriaRegistroController } from './categoria-registro.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ResumenTransaccion } from 'src/registro/resumen-transaccion/entities/resumen-transaccion.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ResumenTransaccion])],
  controllers: [CategoriaRegistroController],
  providers: [CategoriaRegistroService],
})
export class CategoriaRegistroModule {}
