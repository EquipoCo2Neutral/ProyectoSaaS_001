import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { In, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Usuario } from './entities/usuario.entity';
import { Rol } from '../rol/entities/rol.entity';
import { Inquilino } from '../inquilino/entities/inquilino.entity';

@Injectable()
export class UsuarioService {

  constructor(

    @InjectRepository(Usuario)
    private readonly usuarioRepository: Repository<Usuario>,
    @InjectRepository(Rol)
    private readonly rolRepository: Repository<Rol>,
    @InjectRepository(Inquilino)
    private readonly inquilinoRepository: Repository<Inquilino>,

  ) {}


  async create(createUsuarioDto: CreateUsuarioDto) {
    const rol = await this.rolRepository.findOneBy({id: createUsuarioDto.rolId});
    const inquilino = await this.inquilinoRepository.findOneBy({inquilinoId: createUsuarioDto.inquilinoId});
    if(!rol){
      let errors : string[] = []
      errors.push('El rol no existe');
      throw new NotFoundException(errors);
    }
    if(!inquilino){
      let errors : string[] = []
      errors.push('El inquilino no existe');
      throw new NotFoundException(errors);
    }

    return this.usuarioRepository.save({...createUsuarioDto, rol, inquilino});
  }

  findAll() {
    return `This action returns all usuario`;
  }

  findOne(id: number) {
    return `This action returns a #${id} usuario`;
  }

  update(id: number, updateUsuarioDto: UpdateUsuarioDto) {
    return `This action updates a #${id} usuario`;
  }

  remove(id: number) {
    return `This action removes a #${id} usuario`;
  }
}
