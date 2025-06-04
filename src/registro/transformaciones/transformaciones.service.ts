import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateTransformacioneDto } from './dto/create-transformacione.dto';
import { UpdateTransformacioneDto } from './dto/update-transformacione.dto';
import { Transformacione } from './entities/transformacione.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MesProceso } from 'src/gestor/mes-proceso/entities/mes-proceso.entity';
import { Energetico } from 'src/complementos/energia/energeticos/entities/energetico.entity';
import { Unidade } from 'src/complementos/energia/unidades/entities/unidade.entity';
import { ResumenTransaccionService } from '../resumen-transaccion/resumen-transaccion.service';
import { conversorTcal } from 'src/utilties/conversor';

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
    private readonly resumenTransaccionService: ResumenTransaccionService,
  ) {}

  async create(createTransformacioneDto: CreateTransformacioneDto) {
    //VALIDAR MESPROCESO
    const mesProceso = await this.mesProcesoRepository.findOne({
      where: {
        idMesProceso: createTransformacioneDto.idMesProceso,
      },
      relations: ['proceso', 'proceso.planta', 'proceso.planta.inquilino'],
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

    // proceso resumen
    //extraer tcal y unidadGeneral
    const ejemploDatos = {
      idEnergetico: createTransformacioneDto.idEnergetico ?? 0,
      idUnidad: createTransformacioneDto.idUnidad ?? 0,
      cantidad: createTransformacioneDto.cantidad ?? null,
      poderCalorifico: null,
      humedad: null,
    };

    // realizar conversion a Tcal
    const resultado2 = await conversorTcal(ejemploDatos);
    if (!resultado2) {
      throw new BadRequestException('No se pudo calcular la conversión a Tcal');
    }

        // asignar valores
    const resumenTransaccion = await this.resumenTransaccionService.createRT({
      idEnergetico: createTransformacioneDto.idEnergetico,
      idCategoriaRegistro: 10, // Si aplica
      cantidadEntrada: 0,
      cantidadSalida: createTransformacioneDto.cantidad,
      idUnidad: createTransformacioneDto.idUnidad,
      idMesProceso: createTransformacioneDto.idMesProceso,
      idProceso: mesProceso.proceso.idProceso, // Asegúrate de que viene en el DTO
      idPlanta: mesProceso.proceso.planta.idPlanta, // Asegúrate de que viene en el DTO
      inquilinoId: mesProceso.proceso.planta.inquilino.inquilinoId, // Asegúrate de que viene en el DTO
      cantidadGeneral: resultado2.cantidadGeneral,
      teraCalorias: resultado2.cantidadTcal,
    });

    const transformacion = this.transformacionRepository.create({
      resumenTransaccion: resumenTransaccion,
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
      relations: ['mesProceso','mesProceso.proceso','mesProceso.proceso.planta', 'mesProceso.proceso.planta.inquilino', 'energetico', 'unidad', 'energeticoProducido','resumenTransaccion'],
    });
    return transformacion;
  }

  async update(id: number, updateTransformacioneDto: UpdateTransformacioneDto) {
    const transformacion = await this.transformacionRepository.findOne({
      where: { idTransformacion: id },
      relations: [
        'energetico',
        'unidad',
        'mesProceso',
        'mesProceso.proceso',
        'mesProceso.proceso.planta',
        'mesProceso.proceso.planta.inquilino',
        'resumenTransaccion',
      ],
    });
    if (!transformacion) {
      throw new NotFoundException('Transformacion no encontrada');
    }

    Object.assign(transformacion, updateTransformacioneDto);

    if (updateTransformacioneDto.idMesProceso) {
      const mesProceso = await this.mesProcesoRepository.findOne({
        where: {
          idMesProceso: updateTransformacioneDto.idMesProceso,
        },
        relations: ['proceso', 'proceso.planta', 'proceso.planta.inquilino'],
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


    // proceso resumen
    //extraer tcal y unidadGeneral
    const ejemploDatos = {
      idEnergetico:
        updateTransformacioneDto.idEnergetico ??
        transformacion.energetico.idEnergetico ??
        0,
      idUnidad: updateTransformacioneDto.idUnidad ?? transformacion.unidad.idUnidad ?? 0,
      cantidad: updateTransformacioneDto.cantidad ?? transformacion.cantidad ?? null,
      poderCalorifico: null,
      humedad: null,
    };

    // realizar conversion a Tcal
    const resultado2 = await conversorTcal(ejemploDatos);
    if (!resultado2) {
      throw new BadRequestException('No se pudo calcular la conversión a Tcal');
    }

    // asignar valores
    await this.resumenTransaccionService.updateRT(
      transformacion.resumenTransaccion.idResumenTransaccion,
      {
        idEnergetico: updateTransformacioneDto.idEnergetico
          ? updateTransformacioneDto.idEnergetico
          : transformacion.energetico.idEnergetico,
        idCategoriaRegistro:10, // Si aplica
        cantidadEntrada: 0,
        cantidadSalida: updateTransformacioneDto.cantidad
          ? updateTransformacioneDto.cantidad
          : transformacion.cantidad,
        idUnidad: updateTransformacioneDto.idUnidad
          ? updateTransformacioneDto.idUnidad
          : transformacion.unidad.idUnidad,
        idMesProceso: updateTransformacioneDto.idMesProceso
          ? updateTransformacioneDto.idMesProceso
          : transformacion.mesProceso.idMesProceso,
        idProceso: transformacion.mesProceso.proceso.idProceso, // Asegúrate de que viene en el DTO
        idPlanta: transformacion.mesProceso.proceso.planta.idPlanta, // Asegúrate de que viene en el DTO
        inquilinoId: transformacion.mesProceso.proceso.planta.inquilino.inquilinoId, // Asegúrate de que viene en el DTO
        cantidadGeneral: resultado2.cantidadGeneral,
        teraCalorias: resultado2.cantidadTcal,
      },
    );

    const resultado = await this.transformacionRepository.save(transformacion);
    return {
      resultado,
      message: 'Transformacion actualizada correctamente',
    };
  }

  async remove(id: number) {
    const transformacion = await this.transformacionRepository.findOne({
      where: { idTransformacion: id },
      relations: ['resumenTransaccion'],
    });

    if (!transformacion) {
      throw new NotFoundException('Transformación no encontrada');
    }

    // Elimina primero la transformación
    await this.transformacionRepository.delete(id);

    // Luego elimina el resumen si existe
    if (transformacion.resumenTransaccion) {
      await this.resumenTransaccionService.removeRT(
        transformacion.resumenTransaccion.idResumenTransaccion,
      );
    }

    return {
      message: 'Transformación y resumen borrados correctamente',
    };
  }
}
