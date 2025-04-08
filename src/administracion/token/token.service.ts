import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateTokenDto } from './dto/create-token.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Token } from './entities/token.entity';
import { Not, Repository } from 'typeorm';
import { generateToken } from 'src/utilties/token';
import { Usuario } from '../usuario/entities/usuario.entity';

@Injectable()
export class TokenService {
  constructor(
    @InjectRepository(Token)
    private readonly tokenRespository: Repository<Token>,
    @InjectRepository(Usuario)
    private readonly usuarioRespository: Repository<Usuario>,
  ) {}

  async create(createTokenDto: CreateTokenDto) {
    const usuario = await this.usuarioRespository.findOneBy({
      usuarioId: createTokenDto.usuarioId,
    });
    if (!usuario) {
      let errors: string[] = [];
      errors.push('Usuario no encontrado');
      throw new NotFoundException('Usuario no encontrado');
    }

    const token = new Token();
    token.token = generateToken();
    token.usuario = usuario;
    token.expiresAt = new Date(Date.now() + 10 * 60 * 1000); //expira en 10 minutos
    return this.tokenRespository.save(token);
  }

  async confirm(token: string): Promise<String> {
    const tokenConf = await this.tokenRespository.findOne({
      where: { token: token },
      relations: ['usuario'], // Asegurar que la relación usuario se cargue
    });
    if (!tokenConf) {
      let errors: string[] = [];
      errors.push('Token no encontrado');
      throw new NotFoundException('Token no encontrado');
    }
    if (tokenConf.expiresAt < new Date()) {
      await this.tokenRespository.delete(tokenConf);
      throw new UnauthorizedException('Token expirado');
    }

    /*  Actualizar el estado de confirmado en el usuario  */
    const usuario = await this.usuarioRespository.findOneBy({
      usuarioId: tokenConf.usuario.usuarioId,
    });
    if (!usuario) {
      throw new NotFoundException('Usuario no encontrado');
    }

    usuario.confirmacionUsuario = true;
    await this.usuarioRespository.save(usuario);
    await this.tokenRespository.delete(tokenConf);
    /* Eliminar el Token luego de la confirmacion */
    return 'Token confirmado, usuario actualizado y token eliminado';
  }

  findOne(id: number) {
    return `This action returns a #${id} token`;
  }
}
