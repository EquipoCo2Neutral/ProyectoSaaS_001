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

    const transformacion = this.transformacionRepository.create({
      cantidad: createTransformacioneDto.cantidad,
      mesProceso,
      energeticoProducido: {
        idEnergetico: createTransformacioneDto.idEnergeticoProducido,
      },
      energetico: { idEnergetico: createTransformacioneDto.idEnergetico },
      unidad: { idUnidad: createTransformacioneDto.idUnidad },
    });

    const respuesta = await this.transformacionRepository.save(transformacion);

    return {
      message: 'Transformacion registrada correctamente',
      data: respuesta,
    };
  }

  async findAll(id: string): Promise<Transformacione[]> {
    const transformacion = await this.transformacionRepository.find({
      where: { mesProceso: { idMesProceso: id } },
      relations: ['mesProceso', 'unidad', 'energetico', 'energeticoProducido'],
    });

    if (!transformacion) {
      throw new NotFoundException('Transformacion no encontrada');
    }

    return transformacion;
  }

  async findOne(id: number) {
    const transformacion = await this.transformacionRepository.findOne({
      where: { idTransformacion: id },
      relations: ['mesProceso', 'energetico', 'unidad', 'energeticoProducido'],
    });
    return transformacion;
  }

  async update(id: number, updateTransformacioneDto: UpdateTransformacioneDto) {
    const transformacion = await this.transformacionRepository.findOne({
      where: { idTransformacion: id },
    });
    if (!transformacion) {
      throw new NotFoundException('Transformacion no encontrada');
    }

    Object.assign(transformacion, updateTransformacioneDto);

    if (updateTransformacioneDto.idMesProceso) {
      const mesProceso = await this.mesProcesoRepository.findOneBy({
        idMesProceso: updateTransformacioneDto.idMesProceso,
      });
      if (!mesProceso) {
        throw new NotFoundException('Mes Proceso no encontrado');
      }
      transformacion.mesProceso = mesProceso;
    }

    if (updateTransformacioneDto.idEnergetico) {
      const energetico = await this.energeticoRepository.findOneBy({
        idEnergetico: updateTransformacioneDto.idEnergetico,
      });
      if (!energetico) {
        throw new NotFoundException('Energetico no encontrado');
      }
      transformacion.energetico = energetico;
    }

    if (updateTransformacioneDto.idEnergeticoProducido) {
      const energeticoProducido = await this.energeticoRepository.findOneBy({
        idEnergetico: updateTransformacioneDto.idEnergeticoProducido,
      });
      if (!energeticoProducido) {
        throw new NotFoundException('Energetico Producido no encontrado');
      }
      transformacion.energeticoProducido = energeticoProducido;
    }

    if (updateTransformacioneDto.idUnidad) {
      const unidad = await this.unidadRepository.findOneBy({
        idUnidad: updateTransformacioneDto.idUnidad,
      });
      if (!unidad) {
        throw new NotFoundException('Unidad no encontrada');
      }
      transformacion.unidad = unidad;
    }

    const resultado = await this.transformacionRepository.save(transformacion);
    return {
      resultado,
      message: 'Transformacion actualizada correctamente',
    };
  }

  remove(id: number) {
    return `This action removes a #${id} transformacione`;
  }
}
