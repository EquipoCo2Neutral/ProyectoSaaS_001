import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateSuscripcionDto } from './dto/create-suscripcion.dto';
import { UpdateSuscripcionDto } from './dto/update-suscripcion.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Suscripcion } from './entities/suscripcion.entity';
import { Plan } from '../plan/entities/plan.entity';

@Injectable()
export class SuscripcionService {

  constructor( 
    @InjectRepository(Suscripcion)
    private readonly suscripcionRepository: Repository<Suscripcion>,
    @InjectRepository(Plan)
    private readonly planRepository: Repository<Plan>,
  ) {}

  async create(createSuscripcionDto: CreateSuscripcionDto) {
    console.log(createSuscripcionDto);
    const plan = await this.planRepository.findOneBy({idPlan: createSuscripcionDto.planId});
    if(!plan){
      let errors : string[] = []
      errors.push('El plan no existe');
      throw new NotFoundException(errors);
    }

    return this.suscripcionRepository.save({...createSuscripcionDto, plan});
  }

  findAll() {
    return this.suscripcionRepository.find();
  }

  findOne(id: number) {
    return `This action returns a #${id} suscripcion`;
  }

  update(id: number, updateSuscripcionDto: UpdateSuscripcionDto) {
    return `This action updates a #${id} suscripcion`;
  }

  remove(id: number) {
    return `This action removes a #${id} suscripcion`;
  }
}
