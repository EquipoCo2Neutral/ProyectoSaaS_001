import { Injectable } from '@nestjs/common';
import { CreatePlantaDto } from './dto/create-planta.dto';
import { UpdatePlantaDto } from './dto/update-planta.dto';

@Injectable()
export class PlantaService {
  create(createPlantaDto: CreatePlantaDto) {
    return 'This action adds a new planta';
  }

  findAll() {
    return `This action returns all planta`;
  }

  findOne(id: number) {
    return `This action returns a #${id} planta`;
  }

  update(id: number, updatePlantaDto: UpdatePlantaDto) {
    return `This action updates a #${id} planta`;
  }

  remove(id: number) {
    return `This action removes a #${id} planta`;
  }
}
