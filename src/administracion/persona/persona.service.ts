import { Injectable } from '@nestjs/common';
import { CreatePersonaDto } from './dto/create-persona.dto';
import { UpdatePersonaDto } from './dto/update-persona.dto';
import { Persona } from './entities/persona.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class PersonaService {
  constructor(
    @InjectRepository(Persona)
    private readonly personaRepository: Repository<Persona>,
  ) {}

  create(createPersonaDto: CreatePersonaDto) {
    console.log(createPersonaDto);
    const persona = this.personaRepository.create(createPersonaDto);
    return this.personaRepository.save(persona);
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
