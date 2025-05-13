import { Injectable } from '@nestjs/common';
import { CreateEnergeticoDto } from './dto/create-energetico.dto';
import { UpdateEnergeticoDto } from './dto/update-energetico.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Energetico } from './entities/energetico.entity';
import { Repository } from 'typeorm';
import { GrupoEnergetico } from '../grupo-energetico/entities/grupo-energetico.entity';

@Injectable()
export class EnergeticosService {
  constructor(
    @InjectRepository(Energetico)
    private readonly energeticoRepository: Repository<Energetico>,
  ) {}
  create(createEnergeticoDto: CreateEnergeticoDto) {
    return 'This action adds a new energetico';
  }

  async findAll(idGrupoEnergetico: number) {
    return this.energeticoRepository.find({
      where: {
        grupoEnergetico: {
          idGrupoEnergetico,
        },
      },
      relations: ['grupoEnergetico'], // para incluir los datos del grupo
    });
  }

  findOne(id: number) {
    return `This action returns a #${id} energetico`;
  }

  update(id: number, updateEnergeticoDto: UpdateEnergeticoDto) {
    return `This action updates a #${id} energetico`;
  }

  remove(id: number) {
    return `This action removes a #${id} energetico`;
  }
}
