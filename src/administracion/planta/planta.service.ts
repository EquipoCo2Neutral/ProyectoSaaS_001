import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePlantaDto } from './dto/create-planta.dto';
import { UpdatePlantaDto } from './dto/update-planta.dto';
import { Planta } from './entities/planta.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Usuario } from '../usuario/entities/usuario.entity';
import { Inquilino } from '../inquilino/entities/inquilino.entity';
import { Comuna } from 'src/complementos/comunas/entities/comuna.entity';

@Injectable()
export class PlantaService {

  constructor(
    @InjectRepository(Planta)
    private plantaRepository: Repository<Planta>,
    @InjectRepository(Usuario)
    private usuarioRepository: Repository<Usuario>,
    @InjectRepository(Inquilino)
    private inquilinoRepository: Repository<Inquilino>,
    @InjectRepository(Comuna)
    private comunaRepository: Repository<Comuna>

  ) {}


  async create(createPlantaDto: CreatePlantaDto) {

    const usuario = await this.usuarioRepository.findOneBy({usuarioId: createPlantaDto.usuarioId});
    const inquilino = await this.inquilinoRepository.findOneBy({inquilinoId: createPlantaDto.inquilinoId});
    const comuna = await this.comunaRepository.findOneBy({idComuna: createPlantaDto.comunaId});

    if(!usuario){
      let errors : string[] = []
      errors.push('El usuario no existe');
      throw new NotFoundException(errors);
    }
    if(!inquilino){
      let errors : string[] = []
      errors.push('El inquilino no existe');
      throw new NotFoundException(errors);
    }
    if(!comuna){
      let errors : string[] = []
      errors.push('La comuna no existe');
      throw new NotFoundException(errors);
    }


    return this.plantaRepository.save({...createPlantaDto, usuario, inquilino, comuna});
  }

  findAll() {
    return this.plantaRepository.find();
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
