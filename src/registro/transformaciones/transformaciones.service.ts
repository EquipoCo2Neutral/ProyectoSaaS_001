import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTransformacioneDto } from './dto/create-transformacione.dto';
import { UpdateTransformacioneDto } from './dto/update-transformacione.dto';
import { Transformacione } from './entities/transformacione.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MesProceso } from 'src/gestor/mes-proceso/entities/mes-proceso.entity';
import { Energetico } from 'src/complementos/energia/energeticos/entities/energetico.entity';
import { Unidade } from 'src/complementos/energia/unidades/entities/unidade.entity';

@Injectable()
export class TransformacionesService {
  constructor(
    @InjectRepository(Transformacione)
    private readonly transformacionRepository: Repository<Transformacione>,

    @InjectRepository(MesProceso)
    private readonly mesProcesoRepository: Repository<MesProceso>,
    @InjectRepository(Energetico)
    private readonly energeticoRepository: Repository<Energetico>,
    @InjectRepository(Unidade)
    private readonly unidadRepository: Repository<Unidade>,
  ) {}

  async create(createTransformacioneDto: CreateTransformacioneDto) {
    //VALIDAR MESPROCESO
    const mesProceso = await this.mesProcesoRepository.findOneBy({
      idMesProceso: createTransformacioneDto.idMesProceso,
    });

    if (!mesProceso) {
      throw new NotFoundException('Mes Proceso no encontrado');
    }
    //VALIDAR ENERGETICO
    if (createTransformacioneDto.idEnergetico) {
      const energetico = await this.energeticoRepository.findOneBy({
        idEnergetico: createTransformacioneDto.idEnergetico,
      });

      if (!energetico) {
        throw new NotFoundException('Energetico no encontrado');
      }
    }
    //VALIDAR ENERGETICO PRODUCIDO
    if (createTransformacioneDto.idEnergeticoProducido) {
      const energeticoProducido = await this.energeticoRepository.findOneBy({
        idEnergetico: createTransformacioneDto.idEnergeticoProducido,
      });

      if (!energeticoProducido) {
        throw new NotFoundException('Energetico Producido no encontrado');
      }
    }
    //VALIDAR UNIDAD
    if (createTransformacioneDto.idUnidad) {
      const unidad = await this.unidadRepository.findOneBy({
        idUnidad: createTransformacioneDto.idUnidad,
      });

      if (!unidad) {
        throw new NotFoundException('Unidad no encontrada');
      }
    }

    const transformacion = await this.transformacionRepository.save({
      ...createTransformacioneDto,
      mesProceso,
      message: 'Transformacion creada correctamente',
    });

    if (!transformacion) {
      throw new NotFoundException('Error al crear la transformacion');
    }

    return transformacion;
  }

  findAll() {
    return `This action returns all transformaciones`;
  }

  findOne(id: number) {
    return `This action returns a #${id} transformacione`;
  }

  update(id: number, updateTransformacioneDto: UpdateTransformacioneDto) {
    return `This action updates a #${id} transformacione`;
  }

  remove(id: number) {
    return `This action removes a #${id} transformacione`;
  }
}
