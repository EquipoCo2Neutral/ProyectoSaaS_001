import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateInquilinoDto } from './dto/create-inquilino.dto';
import { UpdateInquilinoDto } from './dto/update-inquilino.dto';

import { InjectRepository } from '@nestjs/typeorm';
import { Inquilino } from './entities/inquilino.entity';
import { In, Repository } from 'typeorm';
import { Suscripcion } from '../suscripcion/entities/suscripcion.entity';

@Injectable()
export class InquilinoService {
  constructor(
    @InjectRepository(Inquilino)
    private readonly inquilinoRepository: Repository<Inquilino>,

    @InjectRepository(Suscripcion)
    private readonly suscripcionRepository: Repository<Suscripcion>,
  ) {}

  async create(createInquilinoDto: CreateInquilinoDto) {
    const suscripcion = await this.suscripcionRepository.findOneBy({
      id: createInquilinoDto.suscripcionId,
    });

    if (!suscripcion) {
      let errors: string[] = [];
      errors.push('La suscripcion no existe');
      throw new NotFoundException(errors);
    }

    return this.inquilinoRepository.save({
      ...createInquilinoDto,
      suscripcion,
    });
  }

  findAll() {
    return this.inquilinoRepository.find();
  }

  async findOne(id: string) {
    const inquilino = await this.inquilinoRepository.findOne({where:{inquilinoId: id}, relations: {suscripcion: true}});
    if (!inquilino) {
      let errors: string[] = [];
      errors.push('El inquilino no existe');
      throw new NotFoundException(errors);
    }
    return inquilino;
  }

  update(id: number, updateInquilinoDto: UpdateInquilinoDto) {
    return `This action updates a #${id} inquilino`;
  }

  remove(id: number) {
    return `This action removes a #${id} inquilino`;
  }
}
