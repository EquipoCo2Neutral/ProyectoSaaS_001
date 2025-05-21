import { Injectable } from '@nestjs/common';
import { CreateSubSectorEconomicoDto } from './dto/create-sub-sector-economico.dto';
import { UpdateSubSectorEconomicoDto } from './dto/update-sub-sector-economico.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { SubSectorEconomico } from './entities/sub-sector-economico.entity';
import { Repository } from 'typeorm';

@Injectable()
export class SubSectorEconomicoService {
  constructor(
    @InjectRepository(SubSectorEconomico)
    private readonly subSectorERepository: Repository<SubSectorEconomico>,
  ) {}
  create(createSubSectorEconomicoDto: CreateSubSectorEconomicoDto) {
    return 'This action adds a new subSectorEconomico';
  }

  async findAll(idSector: number) {
    return this.subSectorERepository.find({
      where: {
        sectorEconomico: {
          idSector,
        },
      },
      relations: ['sectorEconomico'],
    });
  }

  findOne(id: number) {
    return `This action returns a #${id} subSectorEconomico`;
  }

  update(id: number, updateSubSectorEconomicoDto: UpdateSubSectorEconomicoDto) {
    return `This action updates a #${id} subSectorEconomico`;
  }

  remove(id: number) {
    return `This action removes a #${id} subSectorEconomico`;
  }
}
