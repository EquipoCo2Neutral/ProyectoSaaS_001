import { Injectable } from '@nestjs/common';
import { CreateSectorEconomicoDto } from './dto/create-sector-economico.dto';
import { UpdateSectorEconomicoDto } from './dto/update-sector-economico.dto';

@Injectable()
export class SectorEconomicoService {
  create(createSectorEconomicoDto: CreateSectorEconomicoDto) {
    return 'This action adds a new sectorEconomico';
  }

  findAll() {
    return `This action returns all sectorEconomico`;
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
