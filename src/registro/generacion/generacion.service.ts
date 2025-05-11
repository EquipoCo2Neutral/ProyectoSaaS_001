import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateGeneracionDto } from './dto/create-generacion.dto';
import { UpdateGeneracionDto } from './dto/update-generacion.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Generacion } from './entities/generacion.entity';
import { Repository } from 'typeorm';
import { MesProceso } from 'src/gestor/mes-proceso/entities/mes-proceso.entity';
import { Adquisicione } from '../adquisiciones/entities/adquisicione.entity';
import { Unidade } from 'src/complementos/energia/unidades/entities/unidade.entity';
import { Energetico } from 'src/complementos/energia/energeticos/entities/energetico.entity';

@Injectable()
export class GeneracionService {
  constructor(
      @InjectRepository(Generacion) private readonly generacionRepository: Repository<Generacion>,

      @InjectRepository(MesProceso) private readonly mesProcesoRepository: Repository<MesProceso>,
  
      
      @InjectRepository(Unidade) private readonly unidadRepository: Repository<Unidade>,
      @InjectRepository(Energetico) private readonly energeticoRepository: Repository<Energetico>,

    ){}

  async create(createGeneracionDto: CreateGeneracionDto) {
    const mesProceso = await this.mesProcesoRepository.findOneBy({
      idMesProceso: createGeneracionDto.idMesProceso,
    })

    if (!mesProceso) {
      throw new NotFoundException("Mes Proceso no encontrado")
    }

    if(createGeneracionDto.idUnidad_CGB){
      const Unidad_CGB = await this.unidadRepository.findOneBy({
        idUnidad: createGeneracionDto.idUnidad_CGB,
      })
      if (!Unidad_CGB) {
        throw new NotFoundException("Unidad CGB no encontrada")
      }
    }
    if(createGeneracionDto.idUnidad_Ci){
      const Unidad_Ci = await this.unidadRepository.findOneBy({
        idUnidad: createGeneracionDto.idUnidad_Ci,
      })
      if (!Unidad_Ci) {
        throw new NotFoundException("Unidad CGB no encontrada")
      }
    }
    if(createGeneracionDto.idUnidad_Cena){
      const Unidad_Cena = await this.unidadRepository.findOneBy({
        idUnidad: createGeneracionDto.idUnidad_Cena,
      })
      if (!Unidad_Cena) {
        throw new NotFoundException("Unidad CGB no encontrada")
      }
    }
    if(createGeneracionDto.idUnidad_Ce){
      const Unidad_Ce = await this.unidadRepository.findOneBy({
        idUnidad: createGeneracionDto.idUnidad_Ce,
      })
      if (!Unidad_Ce) {
        throw new NotFoundException("Unidad CGB no encontrada")
      }
    }
    if(createGeneracionDto.idEnergetico){
      const Unidad_Energetico = await this.energeticoRepository.findOneBy({
        idEnergetico: createGeneracionDto.idEnergetico,
      })
      if (!Unidad_Energetico) {
        throw new NotFoundException("Unidad CGB no encontrada")
      }
    }
    
    const generacion = await this.generacionRepository.save({
      ...createGeneracionDto,
      mesProceso
    });
    
      
    if(!generacion) {
      throw new NotFoundException("Error al crear la adquisicion")
    }

    return generacion;
  }

  async findAll() {
    return await this.generacionRepository.find({relations: {mesProceso: true}});
  }

  async findOne(id: number) {
    const generacion = await this.generacionRepository.findOne({
      where: { idGeneracion:id },
      relations: {mesProceso: true},
    });
    if (!generacion) {
      throw new NotFoundException(`Generacion con ID ${id} no encontrada`);
    }
    return generacion;
  }

  async update(id: number, updateGeneracionDto: UpdateGeneracionDto) {
    const generacion = await this.generacionRepository.findOne({where: {idGeneracion:id}})
    if(!generacion){
      throw new NotFoundException(`Generacion con ID ${id} no encontrada`);
    }
    Object.assign(generacion, updateGeneracionDto);

    if(updateGeneracionDto.idMesProceso){
      const mesProceso = await this.mesProcesoRepository.findOneBy({
        idMesProceso: updateGeneracionDto.idMesProceso,
      })
      if (!mesProceso) {
        throw new NotFoundException("Mes Proceso no encontrado")
      }
      generacion.mesProceso = mesProceso;
    }
    if(updateGeneracionDto.idUnidad_CGB){
      const Unidad_CGB = await this.unidadRepository.findOneBy({
        idUnidad: updateGeneracionDto.idUnidad_CGB,
      })
      if (!Unidad_CGB) {
        throw new NotFoundException("Unidad CGB no encontrada")
      }
    }
    if(updateGeneracionDto.idUnidad_Ci){
      const Unidad_Ci = await this.unidadRepository.findOneBy({
        idUnidad: updateGeneracionDto.idUnidad_Ci,
      })
      if (!Unidad_Ci) {
        throw new NotFoundException("Unidad CGB no encontrada")
      }
    }
    if(updateGeneracionDto.idUnidad_Cena){
      const Unidad_Cena = await this.unidadRepository.findOneBy({
        idUnidad: updateGeneracionDto.idUnidad_Cena,
      })
      if (!Unidad_Cena) {
        throw new NotFoundException("Unidad CGB no encontrada")
      }
    }
    if(updateGeneracionDto.idUnidad_Ce){
      const Unidad_Ce = await this.unidadRepository.findOneBy({
        idUnidad: updateGeneracionDto.idUnidad_Ce,
      })
      if (!Unidad_Ce) {
        throw new NotFoundException("Unidad CGB no encontrada")
      }
    }
    if(updateGeneracionDto.idEnergetico){
      const Unidad_Energetico = await this.energeticoRepository.findOneBy({
        idEnergetico: updateGeneracionDto.idEnergetico,
      })
      if (!Unidad_Energetico) {
        throw new NotFoundException("Unidad CGB no encontrada")
      }
    }

    return await this.generacionRepository.save(generacion);
  }

  remove(id: number) {
    return `This action removes a #${id} generacion`;
  }
}
