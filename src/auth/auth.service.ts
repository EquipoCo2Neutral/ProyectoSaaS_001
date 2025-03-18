import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { UsuarioService } from 'src/administracion/usuario/usuario.service';
import { RegisterDto } from './dto/register.dto';

import * as bcrypt from 'bcrypt';
import { LoginDto } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly usuarioService: UsuarioService,
    private readonly jwtService: JwtService,
  ) {}

  async register({
    correoUsuario,
    contrasenaUsuario,
    rolId,
    inquilinoId,
  }: RegisterDto) {
    const user = await this.usuarioService.findOneByEmail(correoUsuario);

    if (user) {
      throw new BadRequestException('El usuario ya existe');
    }

    await this.usuarioService.create({
      correoUsuario,
      contrasenaUsuario: await bcrypt.hash(contrasenaUsuario, 10),
      rolId,
      inquilinoId,
    });

    return {
      correoUsuario,
    };
  }

  async login({ correoUsuario, contrasenaUsuario }: LoginDto) {
    const user = await this.usuarioService.findOneByEmail(correoUsuario);
    //verificar email
    if (!user) {
      throw new UnauthorizedException('email no es correcto');
    }
    //verificar contraseña
    const isPasswordValid = await bcrypt.compare(
      contrasenaUsuario,
      user.contrasenaUsuario,
    );
    if (!isPasswordValid) {
      throw new UnauthorizedException('contraseña no es correcta');
    }

    const payload = { correoUsuario: user.correoUsuario, rol: user.rol.rol };

    const token = await this.jwtService.signAsync(payload);

    return { token, correoUsuario };
  }

  async profile({
    correoUsuario,
    rol,
  }: {
    correoUsuario: string;
    rol: number;
  }) {
    /*if (rol !== 2) {
      throw new UnauthorizedException('No tienes permisos para acceder');
    }*/
    return await this.usuarioService.findOneByEmail(correoUsuario);
  }
}
