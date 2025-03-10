import { Injectable } from '@nestjs/common';
import { CreatePaiseDto } from './dto/create-paise.dto';
import { UpdatePaiseDto } from './dto/update-paise.dto';
import { Pais } from './entities/paise.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class PaisesService {
  constructor(
    @InjectRepository(Pais)
    private readonly paisRepository: Repository<Pais>,
  ) {}

  create(createPaiseDto: CreatePaiseDto) {
    const pais = new Pais();
    pais.nombre = createPaiseDto.nombre;
    return this.paisRepository.save(pais);
  }

  findAll() {
    return `This action returns all paises`;
  }

  findOne(id: number) {
    return `This action returns a #${id} paise`;
  }

  update(id: number, updatePaiseDto: UpdatePaiseDto) {
    return `This action updates a #${id} paise`;
  }

  remove(id: number) {
    return `This action removes a #${id} paise`;
  }
}
