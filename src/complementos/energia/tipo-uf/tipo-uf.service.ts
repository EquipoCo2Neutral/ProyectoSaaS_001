import { Injectable } from '@nestjs/common';
import { CreateTipoUfDto } from './dto/create-tipo-uf.dto';
import { UpdateTipoUfDto } from './dto/update-tipo-uf.dto';

@Injectable()
export class TipoUfService {
  create(createTipoUfDto: CreateTipoUfDto) {
    return 'This action adds a new tipoUf';
  }

  findAll() {
    return `This action returns all tipoUf`;
  }

  findOne(id: number) {
    return `This action returns a #${id} tipoUf`;
  }

  update(id: number, updateTipoUfDto: UpdateTipoUfDto) {
    return `This action updates a #${id} tipoUf`;
  }

  remove(id: number) {
    return `This action removes a #${id} tipoUf`;
  }
}
