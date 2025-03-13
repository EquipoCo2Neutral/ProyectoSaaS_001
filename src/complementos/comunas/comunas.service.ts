import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateComunaDto } from './dto/create-comuna.dto';
import { UpdateComunaDto } from './dto/update-comuna.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Comuna } from './entities/comuna.entity';
import { Repository } from 'typeorm';
import { Regiones } from '../regiones/entities/regione.entity';

@Injectable()
export class ComunasService {
  constructor(
    @InjectRepository(Comuna)
    private readonly comunaRepository: Repository<Comuna>,
    @InjectRepository(Regiones)
    private readonly regionesRepository: Repository<Regiones>,
  ) {}
  async create(createComunaDto: CreateComunaDto) {
    const region = await this.regionesRepository.findOneBy({
      idRegion: createComunaDto.idRegion,
    });

    if (!region) {
      let errors: string[] = [];
      errors.push('La region no existe');
      throw new NotFoundException(errors);
    }
    return this.comunaRepository.save({
      ...createComunaDto,
      region,
    });
  }

  findAll(idRegion: number) {
    if (idRegion) {
      return this.comunaRepository.find({
        where: {
          region: {
            idRegion,
          },
        },
        relations: {
          region: true,
        },
        order: {
          idComuna: 'ASC',
        },
      });
    }

    return this.comunaRepository.find({
      relations: {
        region: true,
      },
      order: {
        idComuna: 'ASC',
      },
    });
  }

  findOne(id: number) {
    return `This action returns a #${id} comuna`;
  }

  update(id: number, updateComunaDto: UpdateComunaDto) {
    return `This action updates a #${id} comuna`;
  }

  remove(id: number) {
    return `This action removes a #${id} comuna`;
  }
}
