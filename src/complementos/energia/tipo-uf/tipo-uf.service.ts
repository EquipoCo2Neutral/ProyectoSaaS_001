import { Injectable } from '@nestjs/common';
import { CreateTipoUfDto } from './dto/create-tipo-uf.dto';
import { UpdateTipoUfDto } from './dto/update-tipo-uf.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { TipoUf } from './entities/tipo-uf.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TipoUfService {
  constructor(
    @InjectRepository(TipoUf)
    private readonly tipoUFRepository: Repository<TipoUf>,
  ) {}

  create(createTipoUfDto: CreateTipoUfDto) {
    return 'This action adds a new tipoUf';
  }

  async findAll(idCategoriaUF: number) {
    return this.tipoUFRepository.find({
      where: {
        categoriaUF: {
          idCategoriaUF,
        },
      },
      relations: ['categoriaUF'],
    });
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
