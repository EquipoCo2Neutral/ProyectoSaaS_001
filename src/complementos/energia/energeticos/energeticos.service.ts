import { Injectable } from '@nestjs/common';
import { CreateEnergeticoDto } from './dto/create-energetico.dto';
import { UpdateEnergeticoDto } from './dto/update-energetico.dto';

@Injectable()
export class EnergeticosService {
  create(createEnergeticoDto: CreateEnergeticoDto) {
    return 'This action adds a new energetico';
  }

  findAll() {
    return `This action returns all energeticos`;
  }

  findOne(id: number) {
    return `This action returns a #${id} energetico`;
  }

  update(id: number, updateEnergeticoDto: UpdateEnergeticoDto) {
    return `This action updates a #${id} energetico`;
  }

  remove(id: number) {
    return `This action removes a #${id} energetico`;
  }
}
