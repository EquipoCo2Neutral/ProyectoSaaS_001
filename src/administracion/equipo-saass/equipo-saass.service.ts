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

  //para hacer el login

  findOneByEmail(correo: string) {
    return this.equipoSaassRepository.findOne({
      where: { correo },
      relations: ['rol'],
    });
  }

  findOneByEmailWithPassword(correo: string) {
    return this.equipoSaassRepository.findOne({
      where: { correo },
      select: ['idEquipo', 'nombre', 'apellido', 'correo', 'contrasena'],
      relations: ['rol'],
    });
  }

  async create(createEquipoSaassDto: CreateEquipoSaassDto) {
    const rol = await this.rolRepository.findOneBy({
      id: createEquipoSaassDto.rolId,
    });

    if (!rol) {
      let errors: string[] = [];
      errors.push('EL rol no existe');
      throw new NotFoundException(errors);
    }

    return this.equipoSaassRepository.save({ ...createEquipoSaassDto, rol });
  }

  findAll() {
    return this.equipoSaassRepository.find();
  }

  async findOne(id: string) {
    const equipo = await this.equipoSaassRepository.findOne({
      where: { idEquipo: id },
      relations: {rol: true,},
    });

    if (!equipo) {
      let errors: string[] = [];
      errors.push('El equipo no existe');
      throw new NotFoundException(errors);
    }
    console.log(equipo);
    return equipo;
  }

  async update(id: string, updateEquipoSaassDto: UpdateEquipoSaassDto) {
    const equipo = await this.findOne(id);
    Object.assign(equipo, updateEquipoSaassDto);

    if(updateEquipoSaassDto.rolId){
      const rol = await this.rolRepository.findOneBy({id: updateEquipoSaassDto.rolId});
      if (!rol) {
        let errors: string[] = [];
        errors.push('El rol no existe');
        throw new NotFoundException(errors);
      }
      equipo.rol = rol;
    }

    return await this.equipoSaassRepository.save(equipo);
  }

  async remove(id: string) {
    const equipo = await this.findOne(id);
    await this.equipoSaassRepository.remove(equipo);
    return "Producto eliminado";
  }
}
