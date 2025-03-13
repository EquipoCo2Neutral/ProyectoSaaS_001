import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateRegioneDto } from './dto/create-regione.dto';
import { UpdateRegioneDto } from './dto/update-regione.dto';
import { InjectRepository } from '@nestjs/typeorm';

import { Regiones } from './entities/regione.entity';
import { Repository } from 'typeorm';
import { Pais } from '../paises/entities/paise.entity';

@Injectable()
export class RegionesService {
  constructor(
    @InjectRepository(Regiones)
    private readonly regionesRepository: Repository<Regiones>,
    @InjectRepository(Pais)
    private readonly paisRepository: Repository<Pais>,
  ) {}

  async create(createRegioneDto: CreateRegioneDto) {
    const pais = await this.paisRepository.findOneBy({
      idPais: createRegioneDto.idPais,
    });
    if (!pais) {
      let errors: string[] = [];
      errors.push('El pais no existe');
      throw new NotFoundException(errors);
    }
    return this.regionesRepository.save({
      ...createRegioneDto,
      pais,
    });
  }

  findAll(idPais: number) {
    if (idPais) {
      return this.regionesRepository.find({
        where: {
          pais: {
            idPais,
          },
        },
        relations: {
          pais: true,
        },
        order: {
          idRegion: 'ASC',
        },
      });
    }
    return this.regionesRepository.find({
      relations: {
        pais: true,
      },
    });
  }

  findOne(id: number) {
    return `This action returns a #${id} regione`;
  }

  update(id: number, updateRegioneDto: UpdateRegioneDto) {
    return `This action updates a #${id} regione`;
  }

  remove(id: number) {
    return `This action removes a #${id} regione`;
  }
}
