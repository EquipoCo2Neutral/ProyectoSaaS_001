import { Injectable } from '@nestjs/common';
import { CreateExportacioneDto } from './dto/create-exportacione.dto';
import { UpdateExportacioneDto } from './dto/update-exportacione.dto';

@Injectable()
export class ExportacionesService {
  create(createExportacioneDto: CreateExportacioneDto) {
    return 'This action adds a new exportacione';
  }

  findAll() {
    return `This action returns all exportaciones`;
  }

  findOne(id: number) {
    return `This action returns a #${id} exportacione`;
  }

  update(id: number, updateExportacioneDto: UpdateExportacioneDto) {
    return `This action updates a #${id} exportacione`;
  }

  remove(id: number) {
    return `This action removes a #${id} exportacione`;
  }
}
