import { Injectable } from '@nestjs/common';
import { CreateCategoriaUfDto } from './dto/create-categoria-uf.dto';
import { UpdateCategoriaUfDto } from './dto/update-categoria-uf.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { CategoriaUf } from './entities/categoria-uf.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CategoriaUfService {
  constructor(
    @InjectRepository(CategoriaUf)
    private readonly categoriaUFRepository: Repository<CategoriaUf>,
  ) {}
  create(createCategoriaUfDto: CreateCategoriaUfDto) {
    return 'This action adds a new categoriaUf';
  }

  async findAll() {
    return await this.categoriaUFRepository.find();
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
