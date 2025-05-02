import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateAdquisicioneDto } from './dto/create-adquisicione.dto';
import { UpdateAdquisicioneDto } from './dto/update-adquisicione.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Adquisicione } from './entities/adquisicione.entity';
import { MesProceso } from 'src/gestor/mes-proceso/entities/mes-proceso.entity';
import { Repository } from 'typeorm';
import { Transaccione } from 'src/complementos/energia/transacciones/entities/transaccione.entity';
import { GrupoEnergetico } from 'src/complementos/energia/grupo-energetico/entities/grupo-energetico.entity';
import { Energetico } from 'src/complementos/energia/energeticos/entities/energetico.entity';
import { Unidade } from 'src/complementos/energia/unidades/entities/unidade.entity';

@Injectable()
export class AdquisicionesService {
  
  constructor(
    @InjectRepository(Adquisicione) private readonly adquisicioneRepository: Repository<Adquisicione>,

    @InjectRepository(MesProceso) private readonly mesProcesoRepository: Repository<MesProceso>,


    @InjectRepository(Transaccione) private readonly transaccioneRepository: Repository<Transaccione>,
    @InjectRepository(GrupoEnergetico) private readonly grupoEnergeticoRepository: Repository<GrupoEnergetico>,
    @InjectRepository(Energetico) private readonly energeticoRepository: Repository<Energetico>,
    @InjectRepository(Unidade) private readonly unidadRepository: Repository<Unidade>,




  ){}

  async create(createAdquisicioneDto: CreateAdquisicioneDto) {

    const mesProceso = await this.mesProcesoRepository.findOneBy({
      idMesProceso: createAdquisicioneDto.idMesProceso,
    })

    if (!mesProceso) {
      throw new NotFoundException("Mes Proceso no encontrado")
    }

    if(createAdquisicioneDto.idTransaccion){
      const transaccion = await this.transaccioneRepository.findOneBy({
        idTransaccion: createAdquisicioneDto.idTransaccion,
      })

      if (!transaccion) {
        throw new NotFoundException("Transacción no encontrada")
      }
    }
    if(createAdquisicioneDto.idGrupoEnergetico){
      const grupoEnergetico = await this.grupoEnergeticoRepository.findOneBy({
        idGrupoEnergetico: createAdquisicioneDto.idGrupoEnergetico,
      })

      if (!grupoEnergetico) {
        throw new NotFoundException("Grupo energetico no encontrado")
      }
    }
    if(createAdquisicioneDto.idEnergetico){
      const Energetico = await this.energeticoRepository.findOneBy({
        idEnergetico: createAdquisicioneDto.idEnergetico,
      })

      if (!Energetico) {
        throw new NotFoundException("Energetico no encontrado")
      }
    }
    if(createAdquisicioneDto.idUnidad){
      const Unidad = await this.unidadRepository.findOneBy({
        idUnidad: createAdquisicioneDto.idUnidad
      })

      if (!Unidad) {
        throw new NotFoundException("Unidad no encontrada")
      }
    }






    const adquisicion = await this.adquisicioneRepository.save({
      ...createAdquisicioneDto,mesProceso, message: 'Adquisicion creada correctamente'})
    
    if(!adquisicion) {
      throw new NotFoundException("Error al crear la adquisicion")
    }

    return adquisicion;
  }

  findAll() {
    return `This action returns all adquisiciones`;
  }

  findOne(id: number) {
    return `This action returns a #${id} adquisicione`;
  }

  update(id: number, updateAdquisicioneDto: UpdateAdquisicioneDto) {
    return `This action updates a #${id} adquisicione`;
  }

  remove(id: number) {
    return `This action removes a #${id} adquisicione`;
  }
}
