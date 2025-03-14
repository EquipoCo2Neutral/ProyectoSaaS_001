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

    return await this.usuarioService.create({
      correoUsuario,
      contrasenaUsuario: await bcrypt.hash(contrasenaUsuario, 10),
      rolId,
      inquilinoId,
    });
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

    const payload = { correoUsuario: user.correoUsuario };

    const token = await this.jwtService.signAsync(payload);

    return { token, correoUsuario };
  }
}
