import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateRolDto } from './dto/create-rol.dto';
import { UpdateRolDto } from './dto/update-rol.dto';
import { Rol } from './entities/rol.entity';
import { Repository } from 'typeorm';

@Injectable()
export class RolService {
  constructor(
    @InjectRepository(Rol)
    private readonly rolRepository: Repository<Rol>,
  ) {}

  async create(createRolDto: CreateRolDto) {
    const rol = await this.rolRepository.save(createRolDto)
    if(!rol){
      let errors : string[] = []
      errors.push("No se pudo crear el rol")
      throw new NotFoundException(errors)
    }
    return this.rolRepository.save(rol);
  }

  findAll() {
    return this.rolRepository.find();
  }

  async findOne(id: number) {
    const rol = await this.rolRepository.findOne({
      where : {id: id}
    });
    if(!rol){
      let errors : string[] = []
      errors.push("El rol no existe")
      throw new NotFoundException(errors)
    }
    return rol;
  }

  async update(id: number, updateRolDto: UpdateRolDto) {
    const rol = await this.findOne(id)
    Object.assign(rol, updateRolDto)

    return await this.rolRepository.save(rol);
  }

  async remove(id: number) {
    const rol = await this.findOne(id)
    await this.rolRepository.remove(rol)
    return "El rol ha sido eliminado";
  }
}
