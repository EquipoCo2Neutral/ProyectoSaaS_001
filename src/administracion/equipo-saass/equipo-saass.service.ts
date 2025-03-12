import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateEquipoSaassDto } from './dto/create-equipo-saass.dto';
import { UpdateEquipoSaassDto } from './dto/update-equipo-saass.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { EquipoSaass } from './entities/equipo-saass.entity';
import { Rol } from '../rol/entities/rol.entity';

@Injectable()
export class EquipoSaassService {

  constructor(

    @InjectRepository(EquipoSaass)
    private readonly equipoSaassRepository: Repository<EquipoSaass>,

    @InjectRepository(Rol)
    private readonly rolRepository: Repository<Rol>,

  ) {}


  async create(createEquipoSaassDto: CreateEquipoSaassDto) {
    
    const rol = await this.rolRepository.findOneBy({id: createEquipoSaassDto.rolId});

    if (!rol) {
      let errors : string[] = []
      errors.push('La suscripcion no existe');
      throw new NotFoundException(errors);
    }

    return this.equipoSaassRepository.save({...createEquipoSaassDto, rol}); ;
  }

  findAll() {
    return `This action returns all equipoSaass`;
  }

  findOne(id: number) {
    return `This action returns a #${id} equipoSaass`;
  }

  update(id: number, updateEquipoSaassDto: UpdateEquipoSaassDto) {
    return `This action updates a #${id} equipoSaass`;
  }

  remove(id: number) {
    return `This action removes a #${id} equipoSaass`;
  }
}
