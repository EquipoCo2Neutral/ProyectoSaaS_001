import { BadRequestException, Injectable } from '@nestjs/common';
import { UsuarioService } from 'src/administracion/usuario/usuario.service';
import { RegisterDto } from './dto/register.dto';

import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(private readonly usuarioService: UsuarioService) {}

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

  login() {
    return 'login';
  }
}
