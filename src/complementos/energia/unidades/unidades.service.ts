import { Injectable } from '@nestjs/common';
import { CreateUnidadeDto } from './dto/create-unidade.dto';
import { UpdateUnidadeDto } from './dto/update-unidade.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Unidade } from './entities/unidade.entity';
import { In, Repository } from 'typeorm';

@Injectable()
export class UnidadesService {
  constructor(
    @InjectRepository(Unidade)
    private readonly unidadRepository: Repository<Unidade>,
  ) {}
  create(createUnidadeDto: CreateUnidadeDto) {
    return 'This action adds a new unidade';
  }

  async findAll(idEnergetico: number) {
    return this.unidadRepository.find({
      where: {
        energetico: {
          idEnergetico,
        },
      },
      relations: ['energetico'],
    });
  }

  async findByIds(ids: number[]): Promise<Unidade[]> {
    return this.unidadRepository.find({
      where: {
        idUnidad: In(ids),
      },
    });
  }

  findOne(id: number) {
    return `This action returns a #${id} unidade`;
  }

  update(id: number, updateUnidadeDto: UpdateUnidadeDto) {
    return `This action updates a #${id} unidade`;
  }

  remove(id: number) {
    return `This action removes a #${id} unidade`;
  }
}
