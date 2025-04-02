import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { FindManyOptions, In, Repository } from 'typeorm';
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

  //para hacer el login

  findOneByEmail(correoUsuario: string) {
    return this.usuarioRepository.findOne({
      where: { correoUsuario },
      relations: ['rol'],
    });
  }

  findOneByEmailWithPassword(correoUsuario: string) {
    return this.usuarioRepository.findOne({
      where: { correoUsuario },
      select: ['usuarioId', 'correoUsuario', 'contrasenaUsuario'],
      relations: ['rol', 'inquilino'],
    });
  }

  async create(createUsuarioDto: CreateUsuarioDto) {
    const rol = await this.rolRepository.findOneBy({
      id: createUsuarioDto.rolId,
    });
    const inquilino = await this.inquilinoRepository.findOneBy({
      inquilinoId: createUsuarioDto.inquilinoId,
    });
    if (!rol) {
      let errors: string[] = [];
      errors.push('El rol no existe');
      throw new NotFoundException(errors);
    }
    if (!inquilino) {
      let errors: string[] = [];
      errors.push('El inquilino no existe');
      throw new NotFoundException(errors);
    }

    return this.usuarioRepository.save({ ...createUsuarioDto, rol, inquilino });
  }


  

  // para listar los usuarios y poder listarlos tambien por rol e inquilino si se requiere 
  // (como en el caso de los administradores saas cuando seleccionen un inquilino y se
  //  deban mostrar los adminstradores de ese inquilino; aca podemos obtener los usuariosId 
  //  para buscar en tabla persona los datos de los usuarios con rol admin y mostrarlos) 

  async findAll(rolId: number | null, inquilinoId: string |null ) {

    const options : FindManyOptions<Usuario> = {
      relations: {
        rol: true,
        inquilino: true,
      },
      order: {
        usuarioId: 'ASC',
      },
      where: {},
    }

    if (rolId ) {
      options.where = {
        ...options.where,
        rol: { id: rolId },
      };
      options.relations = {
        rol: false,
      }
    }

    if (inquilinoId) {
      options.where = {
        ...options.where,
        inquilino: { inquilinoId: inquilinoId },
      };
      options.relations = {
        inquilino: false,
      }
    }

    const [usuarios, total] = await this.usuarioRepository.findAndCount(options);
    return {usuarios, total};

  }

  async findOne(id: string) {
    const usuario = await this.usuarioRepository.findOne({
      where: { usuarioId: id },
      relations: {rol: true, inquilino: true,}
    });
    if(!usuario){
      let errors : string[] = []
      errors.push("No existe ese usuario")
      throw new NotFoundException(errors);
    }
    return usuario;

  }

  async update(id: string, updateUsuarioDto: UpdateUsuarioDto) {
    const usuario = await this.findOne(id)
    Object.assign(usuario, updateUsuarioDto)

    if(updateUsuarioDto.inquilinoId){
      const inquilino = await this.inquilinoRepository.findOneBy({inquilinoId: updateUsuarioDto.inquilinoId})
      if(!inquilino){
        let errors : string[]=[]
        errors.push("El inquilino no existe")
        throw new NotFoundException(errors)
      }
      usuario.inquilino = inquilino
    }
    if(updateUsuarioDto.rolId){
      const rol = await this.rolRepository.findOneBy({id: updateUsuarioDto.rolId})
      if(!rol){
        let errors : string[] = []
        errors.push("El inquilino no existe")
        throw new NotFoundException(errors)
      }
      usuario.rol = rol
    }
    return this.usuarioRepository.save(usuario);
  }

  async remove(id: string) {
    const usuario = await this.findOne(id)
    await this.usuarioRepository.remove(usuario)
    return "El usuario ha sido eliminado";
  }
}
