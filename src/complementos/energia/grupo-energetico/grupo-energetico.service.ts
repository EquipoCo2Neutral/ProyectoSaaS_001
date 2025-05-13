import { Injectable } from '@nestjs/common';
import { CreateGrupoEnergeticoDto } from './dto/create-grupo-energetico.dto';
import { UpdateGrupoEnergeticoDto } from './dto/update-grupo-energetico.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { GrupoEnergetico } from './entities/grupo-energetico.entity';
import { Repository } from 'typeorm';

@Injectable()
export class GrupoEnergeticoService {
  constructor(
    @InjectRepository(GrupoEnergetico)
    private readonly grupoERepository: Repository<GrupoEnergetico>,
  ) {}
  create(createGrupoEnergeticoDto: CreateGrupoEnergeticoDto) {
    return 'This action adds a new grupoEnergetico';
  }

  findAll() {
    return this.grupoERepository.find();
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
