import { Injectable } from '@nestjs/common';
import { CreateCategoriaUfDto } from './dto/create-categoria-uf.dto';
import { UpdateCategoriaUfDto } from './dto/update-categoria-uf.dto';

@Injectable()
export class CategoriaUfService {
  create(createCategoriaUfDto: CreateCategoriaUfDto) {
    return 'This action adds a new categoriaUf';
  }

  findAll() {
    return `This action returns all categoriaUf`;
  }

  findOne(id: number) {
    return `This action returns a #${id} categoriaUf`;
  }

  update(id: number, updateCategoriaUfDto: UpdateCategoriaUfDto) {
    return `This action updates a #${id} categoriaUf`;
  }

  remove(id: number) {
    return `This action removes a #${id} categoriaUf`;
  }
}
