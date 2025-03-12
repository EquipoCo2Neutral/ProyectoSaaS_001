import { HttpException, Injectable, NotFoundException } from '@nestjs/common';
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
    return this.paisRepository.find();
  }

  async findOne(id: number) {
    const pais = await this.paisRepository.findOneBy({ idPais: id });
    if (!pais) {
      throw new NotFoundException('Pais no encontrado');
    }
    return pais;
  }

  async update(id: number, updatePaiseDto: UpdatePaiseDto) {
    const pais = await this.findOne(id); //hace referencia al findone de arriba para validar que el pais exista
    pais.nombre = updatePaiseDto.nombre;
    return await this.paisRepository.save(pais);
  }

  async remove(id: number) {
    const pais = await this.findOne(id);
    await this.paisRepository.delete(pais);
    return 'Pais eliminado';
  }
}
