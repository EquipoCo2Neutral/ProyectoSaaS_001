import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePersonaDto } from './dto/create-persona.dto';
import { UpdatePersonaDto } from './dto/update-persona.dto';
import { Persona } from './entities/persona.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Usuario } from '../usuario/entities/usuario.entity';

@Injectable()
export class PersonaService {
  constructor(
    @InjectRepository(Persona)
    private readonly personaRepository: Repository<Persona>,
    @InjectRepository(Usuario)
    private readonly usuarioRepository: Repository<Usuario>,

  ) {}

  async create(createPersonaDto: CreatePersonaDto) {
    const usuario = await this.usuarioRepository.findOneBy({usuarioId: createPersonaDto.usuarioId});
    if (!usuario) {
      let errors : string[] = []
      errors.push('El usuario no existe');
      throw new NotFoundException(errors);
    }
    return this.personaRepository.save({...createPersonaDto, usuario});
  }

  findAll() {
    return this.personaRepository.find();
  }

  findOne(id: string) {
    const persona = this.personaRepository.findOneBy({id});
    return persona;
  }

  update(id: number, updatePersonaDto: UpdatePersonaDto) {
    return `This action updates a #${id} persona`;
  }

  remove(id: number) {
    return `This action removes a #${id} persona`;
  }
}
