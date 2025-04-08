import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePersonaDto } from './dto/create-persona.dto';
import { UpdatePersonaDto } from './dto/update-persona.dto';
import { Persona } from './entities/persona.entity';
import { In, Repository } from 'typeorm';
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

  async findOne(id: string) {
    const persona = await this.personaRepository.findOne({
      where: {id : id},
      relations: {usuario : true}
    });

    if(!persona){
      let errors : string[] = []
      errors.push('La persona no existe')
      throw new NotFoundException(errors);
    }
    return persona;
  }

  async findUsuarioId(usuarioId: string[]): Promise<Persona[]> {
    if (!usuarioId || usuarioId.length === 0) {
      return []; // Devuelve un array vacío si no hay IDs válidos
    }
    return this.personaRepository.find({
      where: {usuario : {usuarioId: In(usuarioId)}}, // Filtra con un array de UUIDs
      relations: {usuario : true}
    });
  }

  async update(id: string, updatePersonaDto: UpdatePersonaDto) {
    const persona = await this.findOne(id);
    Object.assign(persona, updatePersonaDto)

    if(updatePersonaDto.usuarioId){
      const usuario = await this.usuarioRepository.findOneBy({usuarioId : updatePersonaDto.usuarioId})

      if(!usuario){
        let errors : string[] = []
        errors.push('El usuario no existe')
        throw new NotFoundException(errors);
      }
      persona.usuario = usuario;
    }

    return await this.personaRepository.save(persona);
  }

  async remove(id: string) {
    const persona = await this.findOne(id);
    await this.personaRepository.remove(persona)
    return "La persona ha sido eliminada";
  }
}
