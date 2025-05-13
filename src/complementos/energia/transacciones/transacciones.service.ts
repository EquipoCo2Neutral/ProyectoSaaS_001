import { Injectable } from '@nestjs/common';
import { CreateTransaccioneDto } from './dto/create-transaccione.dto';
import { UpdateTransaccioneDto } from './dto/update-transaccione.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Transaccione } from './entities/transaccione.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TransaccionesService {
  constructor(
    @InjectRepository(Transaccione)
    private readonly transaccionRepository: Repository<Transaccione>,
  ) {}

  create(createTransaccioneDto: CreateTransaccioneDto) {
    return 'This action adds a new transaccione';
  }

  findAll() {
    return this.transaccionRepository.find();
  }

  findOne(id: number) {
    return `This action returns a #${id} transaccione`;
  }

  update(id: number, updateTransaccioneDto: UpdateTransaccioneDto) {
    return `This action updates a #${id} transaccione`;
  }

  remove(id: number) {
    return `This action removes a #${id} transaccione`;
  }
}
