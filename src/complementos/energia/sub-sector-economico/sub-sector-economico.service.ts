import { Injectable } from '@nestjs/common';
import { CreateSubSectorEconomicoDto } from './dto/create-sub-sector-economico.dto';
import { UpdateSubSectorEconomicoDto } from './dto/update-sub-sector-economico.dto';

@Injectable()
export class SubSectorEconomicoService {
  create(createSubSectorEconomicoDto: CreateSubSectorEconomicoDto) {
    return 'This action adds a new subSectorEconomico';
  }

  findAll() {
    return `This action returns all subSectorEconomico`;
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
