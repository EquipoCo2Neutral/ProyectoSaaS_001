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
import { EquipoSaassService } from 'src/administracion/equipo-saass/equipo-saass.service';
import { LoginEquipoDto } from './dto/loginEquipo.dto';
import { RegisterEquipoDto } from './dto/registerEquipo.dto';

import * as jwt from 'jsonwebtoken';
import * as dotenv from 'dotenv';
dotenv.config();

@Injectable()
export class AuthService {
  constructor(
    private readonly usuarioService: UsuarioService,
    private readonly equipoSaassService: EquipoSaassService,
    private readonly jwtService: JwtService,
  ) {}

  async validateInvitationToken(token: string) {
    if (!token) {
      throw new BadRequestException('Token no proporcionado.');
    }

    try {
      // Decodificar el token
      if (!process.env.JWT_SECRET) {
        throw new Error('SECRET_KEY is not defined in environment variables.');
      }

      const decoded = jwt.verify(token, process.env.JWT_SECRET) as unknown as {
        email: string;
        rol: string;
        inquilinoId: string;
      };

      return {
        email: decoded.email,
        rol: decoded.rol,
        inquilinoId: decoded.inquilinoId,
      };
    } catch (error) {
      throw new BadRequestException('Token inválido o expirado.');
    }
  }

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

  async register_equipo({
    nombre,
    apellido,
    correo,
    contrasena,
    rolId,
  }: RegisterEquipoDto) {
    const user = await this.equipoSaassService.findOneByEmail(correo);

    if (user) {
      throw new BadRequestException('El usuario ya existe');
    }

    await this.equipoSaassService.create({
      nombre,
      apellido,
      correo,
      contrasena: await bcrypt.hash(contrasena, 10),
      rolId,
    });

    return {
      correo,
    };
  }

  async login({ correoUsuario, contrasenaUsuario }: LoginDto) {
    const user =
      await this.usuarioService.findOneByEmailWithPassword(correoUsuario);
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

    const payload = {
      correoUsuario: user.correoUsuario,
      rol: user.rol.rol,
      inquilinoId: user.inquilino.inquilinoId,
    };

    const token = await this.jwtService.signAsync(payload);

    return { token, correoUsuario };
  }

  async login_equipo({ correo, contrasena }: LoginEquipoDto) {
    const user =
      await this.equipoSaassService.findOneByEmailWithPassword(correo);
    //verificar email

    if (!user) {
      throw new UnauthorizedException('email no es correcto');
    }
    //verificar contraseña
    const isPasswordValid = await bcrypt.compare(contrasena, user.contrasena);
    if (!isPasswordValid) {
      throw new UnauthorizedException('contraseña no es correcta');
    }

    const payload = { correoUsuario: user.correo, rol: user.rol.rol };

    const token = await this.jwtService.signAsync(payload);

    return { token, correo };
  }

  async profile({ correoUsuario }: { correoUsuario: string; rol: number }) {
    return await this.usuarioService.findOneByEmail(correoUsuario);
  }

  async profile_equipo({
    correoUsuario,
  }: {
    correoUsuario: string;
    rol: number;
  }) {
    return await this.equipoSaassService.findOneByEmail(correoUsuario);
  }
}
