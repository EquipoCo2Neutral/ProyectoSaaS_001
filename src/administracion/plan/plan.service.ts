import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePlanDto } from './dto/create-plan.dto';
import { UpdatePlanDto } from './dto/update-plan.dto';
import { Plan } from './entities/plan.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class PlanService {
  constructor(
    @InjectRepository(Plan)
    private readonly planRepository: Repository<Plan>,
  ) {}

  create(createPlanDto: CreatePlanDto) {
    console.log(createPlanDto);
    return this.planRepository.save(createPlanDto);
  }

  findAll() {
    return this.planRepository.find();
  }

  async findOne(id: number) {
    const plan = await this.planRepository.findOne({
      where : {idPlan:id}
     });

     if(!plan){
      let errors : string[] = []
      errors.push('El plan no existe')
      throw new NotFoundException(errors);

     }
    return plan;
  }

  async update(id: number, updatePlanDto: UpdatePlanDto) {
    const plan = await this.findOne(id)
    Object.assign(plan, updatePlanDto)
    
    return await this.planRepository.save(plan);
  }

  async remove(id: number) {
    const plan = await this.findOne(id)
    await this.planRepository.remove(plan)
    return "El plan ha sido eliminado";
  }
}
