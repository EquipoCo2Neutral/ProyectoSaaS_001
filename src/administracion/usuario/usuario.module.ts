import { Module } from '@nestjs/common';
import { UsuarioService } from './usuario.service';
import { UsuarioController } from './usuario.controller';

import { TypeOrmModule } from '@nestjs/typeorm';
import { Usuario } from './entities/usuario.entity';
import { Rol } from '../rol/entities/rol.entity';
import { Inquilino } from '../inquilino/entities/inquilino.entity';
import { Persona } from '../persona/entities/persona.entity';
import { Planta } from '../planta/entities/planta.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Usuario, Rol, Inquilino, Persona, Planta]),
  ],
  controllers: [UsuarioController],
  providers: [UsuarioService],
  exports: [UsuarioService],
})
export class UsuarioModule {}
