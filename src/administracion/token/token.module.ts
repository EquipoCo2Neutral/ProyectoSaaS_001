import { Module } from '@nestjs/common';
import { TokenService } from './token.service';
import { TokenController } from './token.controller';
import { Usuario } from '../usuario/entities/usuario.entity';
import { Token } from './entities/token.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Usuario, Token])],
  controllers: [TokenController],
  providers: [TokenService],
})
export class TokenModule {}
