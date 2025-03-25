import { Injectable } from '@nestjs/common';
import { CreateTokenDto } from './dto/create-token.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Token } from './entities/token.entity';
import { Repository } from 'typeorm';
import { generateToken } from 'src/utilties/token';
import { Usuario } from '../usuario/entities/usuario.entity';

@Injectable()
export class TokenService {

  constructor(
    @InjectRepository(Token)
    private readonly tokenRespository: Repository<Token>,
    @InjectRepository(Usuario)
    private readonly usuarioRespository: Repository<Usuario>
  ) {}

  async create(createTokenDto: CreateTokenDto) {

    const usuario = await this.usuarioRespository.findOneBy({usuarioId : createTokenDto.usuarioId})
    if (!usuario) {
      let errors : string[] = []
      errors.push('Usuario no encontrado')
      throw new Error('Usuario no encontrado')
    }

    //const token = await this.tokenRespository.create(createTokenDto)
    const token = new Token()
    token.token = generateToken()
    token.usuario = usuario
    return this.tokenRespository.save(token)

  }

  findOne(id: number) {
    return `This action returns a #${id} token`;
  }

  
}
