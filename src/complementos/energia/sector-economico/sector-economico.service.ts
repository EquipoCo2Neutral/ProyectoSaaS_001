import { Injectable } from '@nestjs/common';
import { CreateSectorEconomicoDto } from './dto/create-sector-economico.dto';
import { UpdateSectorEconomicoDto } from './dto/update-sector-economico.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { SectorEconomico } from './entities/sector-economico.entity';
import { Repository } from 'typeorm';

@Injectable()
export class SectorEconomicoService {
  constructor(
    @InjectRepository(SectorEconomico)
    private readonly sectorERepository: Repository<SectorEconomico>,
  ) {}

  create(createSectorEconomicoDto: CreateSectorEconomicoDto) {
    return 'This action adds a new sectorEconomico';
  }

  async findAll() {
    return this.sectorERepository.find();
  }

  findOne(id: number) {
    return `This action returns a #${id} sectorEconomico`;
  }

  update(id: number, updateSectorEconomicoDto: UpdateSectorEconomicoDto) {
    return `This action updates a #${id} sectorEconomico`;
  }

  remove(id: number) {
    return `This action removes a #${id} sectorEconomico`;
  }
}
