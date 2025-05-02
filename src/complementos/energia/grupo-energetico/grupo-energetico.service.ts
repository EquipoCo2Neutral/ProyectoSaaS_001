import { Injectable } from '@nestjs/common';
import { CreateGrupoEnergeticoDto } from './dto/create-grupo-energetico.dto';
import { UpdateGrupoEnergeticoDto } from './dto/update-grupo-energetico.dto';

@Injectable()
export class GrupoEnergeticoService {
  create(createGrupoEnergeticoDto: CreateGrupoEnergeticoDto) {
    return 'This action adds a new grupoEnergetico';
  }

  findAll() {
    return `This action returns all grupoEnergetico`;
  }

  findOne(id: number) {
    return `This action returns a #${id} grupoEnergetico`;
  }

  update(id: number, updateGrupoEnergeticoDto: UpdateGrupoEnergeticoDto) {
    return `This action updates a #${id} grupoEnergetico`;
  }

  remove(id: number) {
    return `This action removes a #${id} grupoEnergetico`;
  }
}
