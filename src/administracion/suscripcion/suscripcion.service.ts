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

  async findOne(id: number) {
    const suscripcion = await this.suscripcionRepository.findOne({
      where : {id:id},
      relations : {plan : true}
    })
    if(!suscripcion){
      let errors : string[] = []
      errors.push("La suscripcion no existe")
      throw new NotFoundException(errors)
    }


    return suscripcion;
  }

  async update(id: number, updateSuscripcionDto: UpdateSuscripcionDto) {
    const suscripcion = await this.findOne(id)
    Object.assign(suscripcion, updateSuscripcionDto)

    if(updateSuscripcionDto.planId){

      const plan = await this.planRepository.findOneBy({idPlan: updateSuscripcionDto.planId})
      if(!plan){
        let errors : string[] = []
        errors.push("El plan no existe")
        throw new NotFoundException(errors)
      }
      suscripcion.plan = plan
    }

    return await this.suscripcionRepository.save(suscripcion);
  }

  async remove(id: number) {
    const suscripcion = await this.findOne(id)
    await this.suscripcionRepository.remove(suscripcion)
    return "La suscripcion ha sido eliminada";
  }
}
