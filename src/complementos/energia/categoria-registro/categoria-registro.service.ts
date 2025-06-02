import { Injectable } from '@nestjs/common';
import { CreateCategoriaRegistroDto } from './dto/create-categoria-registro.dto';
import { UpdateCategoriaRegistroDto } from './dto/update-categoria-registro.dto';

@Injectable()
export class CategoriaRegistroService {
  create(createCategoriaRegistroDto: CreateCategoriaRegistroDto) {
    return 'This action adds a new categoriaRegistro';
  }

  findAll() {
    return `This action returns all categoriaRegistro`;
  }

  findOne(id: number) {
    return `This action returns a #${id} categoriaRegistro`;
  }

  update(id: number, updateCategoriaRegistroDto: UpdateCategoriaRegistroDto) {
    return `This action updates a #${id} categoriaRegistro`;
  }

  remove(id: number) {
    return `This action removes a #${id} categoriaRegistro`;
  }
}
