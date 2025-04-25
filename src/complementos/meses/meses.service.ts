import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { Mese } from './entities/mese.entity';

@Injectable()
export class MesesService {
  constructor(
    @InjectRepository(Mese)
    private readonly meseRepository: Repository<Mese>,
  ) {}
  async findAll() {
    return this.meseRepository.find();
  }

  async findOne(id: number) {
    const mes = await this.meseRepository.findOneBy({ idMes: id });
    if (!mes) {
      throw new NotFoundException('Mes no ecnontrado');
    }
    return mes;
  }
}
