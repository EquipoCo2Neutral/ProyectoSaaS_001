import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateExportacioneDto } from './dto/create-exportacione.dto';
import { UpdateExportacioneDto } from './dto/update-exportacione.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Exportacione } from './entities/exportacione.entity';
import { Repository } from 'typeorm';
import { MesProceso } from 'src/gestor/mes-proceso/entities/mes-proceso.entity';
import { Pais } from 'src/complementos/paises/entities/paise.entity';
import { Unidade } from 'src/complementos/energia/unidades/entities/unidade.entity';
import { Energetico } from 'src/complementos/energia/energeticos/entities/energetico.entity';
import { conversorTcal } from 'src/utilties/conversor';
import { ResumenTransaccionService } from '../resumen-transaccion/resumen-transaccion.service';

@Injectable()
export class ExportacionesService {
  constructor(
    @InjectRepository(Exportacione)
    private readonly exportacionRepository: Repository<Exportacione>,
    @InjectRepository(MesProceso)
    private readonly mesProcesoRepository: Repository<MesProceso>,
    @InjectRepository(Pais) private readonly paisRepository: Repository<Pais>,
    @InjectRepository(Unidade)
    private readonly unidadRepository: Repository<Unidade>,
    @InjectRepository(Energetico)
    private readonly energeticoRepository: Repository<Energetico>,
    private readonly resumenTransaccionService: ResumenTransaccionService,
  ) {}

  async create(createExportacioneDto: CreateExportacioneDto) {
    const mesProceso = await this.mesProcesoRepository.findOne({
      where: { idMesProceso: createExportacioneDto.idMesProceso },
      relations: ['proceso', 'proceso.planta', 'proceso.planta.inquilino'],
    });
    if (!mesProceso) {
      throw new NotFoundException('Mes Proceso no encontrado');
    }

    //extraer tcal y unidadGeneral
    const ejemploDatos = {
      idEnergetico: createExportacioneDto.idEnergetico,
      idUnidad: createExportacioneDto.idUnidad,
      cantidad: createExportacioneDto.cantidad,
      poderCalorifico: null,
      humedad: null,
    };

    const resultado2 = await conversorTcal(ejemploDatos);

    if (!resultado2) {
      throw new BadRequestException('No se pudo calcular la conversión a Tcal');
    }

    if (createExportacioneDto.idEnergetico) {
      const Energetico = await this.energeticoRepository.findOneBy({
        idEnergetico: createExportacioneDto.idEnergetico,
      });

      if (!Energetico) {
        throw new NotFoundException('Energetico no encontrado');
      }
    }

    if (createExportacioneDto.idUnidad) {
      const Unidad = await this.unidadRepository.findOneBy({
        idUnidad: createExportacioneDto.idUnidad,
      });

      if (!Unidad) {
        throw new NotFoundException('Unidad no encontrada');
      }
    }

    if (createExportacioneDto.idPais) {
      const Pais = await this.paisRepository.findOneBy({
        idPais: createExportacioneDto.idPais,
      });

      if (!Pais) {
        throw new NotFoundException('Pais no encontrado');
      }
    }

    const resumenTransaccion = await this.resumenTransaccionService.createRT({
      idEnergetico: createExportacioneDto.idEnergetico,
      idCategoriaRegistro: 21, // Si aplica
      cantidadEntrada: 0,
      cantidadSalida: createExportacioneDto.cantidad,
      idUnidad: createExportacioneDto.idUnidad,
      idMesProceso: createExportacioneDto.idMesProceso,
      idProceso: mesProceso.proceso.idProceso,
      idPlanta: mesProceso.proceso.planta.idPlanta,
      inquilinoId: mesProceso.proceso.planta.inquilino.inquilinoId,
      cantidadGeneral: resultado2.cantidadGeneral,
      teraCalorias: resultado2.cantidadTcal,
    });

    const exportacion = this.exportacionRepository.create({
      resumenTransaccion: resumenTransaccion,
      cantidad: createExportacioneDto.cantidad,
      empresaDestino: createExportacioneDto.empresaDestino,
      mesProceso,
      unidad: { idUnidad: createExportacioneDto.idUnidad } as Unidade,
      energetico: {
        idEnergetico: createExportacioneDto.idEnergetico,
      } as Energetico,
      pais: { idPais: createExportacioneDto.idPais } as Pais,
    });

    const resultado = await this.exportacionRepository.save(exportacion);

    return {
      message: 'Exportacion registrada correctamente',
      data: resultado,
    };
  }

  async findAll(id: string): Promise<Exportacione[]> {
    const exportaciones = await this.exportacionRepository.find({
      where: { mesProceso: { idMesProceso: id } },
      relations: ['mesProceso', 'energetico', 'unidad', 'pais'],
    });
    if (!exportaciones) {
      throw new NotFoundException('No hay exportaciones registradas');
    }
    return exportaciones;
  }

  async findOne(id: number) {
    const exportacion = await this.exportacionRepository.findOne({
      where: { idExportacion: id },
      relations: {
        mesProceso: true,
        energetico: true,
        unidad: true,
        pais: true,
      },
    });
    if (!exportacion) {
      throw new NotFoundException('Exportacion no encontrada');
    }
    return exportacion;
  }

  async update(id: number, updateExportacioneDto: UpdateExportacioneDto) {
    const exportacion = await this.exportacionRepository.findOne({
      where: { idExportacion: id },
      relations: [
        'mesProceso',
        'mesProceso.proceso',
        'mesProceso.proceso.planta',
        'mesProceso.proceso.planta.inquilino',
        'energetico',
        'unidad',
        'pais',
        'resumenTransaccion',
      ],
    });
    if (!exportacion) {
      throw new NotFoundException('Exportacion no encontrada');
    }

    Object.assign(exportacion, updateExportacioneDto);

    if (updateExportacioneDto.idMesProceso) {
      const mesProceso = await this.mesProcesoRepository.findOne({
        where: { idMesProceso: updateExportacioneDto.idMesProceso },
        relations: [
          'proceso',
          'proceso.planta',
          'proceso.planta.inquilino',
          'resumenTransaccion',
        ],
      });

      if (!mesProceso) {
        throw new NotFoundException('Mes Proceso no encontrado');
      }
      // Validar que las relaciones necesarias existen
      if (
        !mesProceso.proceso ||
        !mesProceso.proceso.planta ||
        !mesProceso.proceso.planta.inquilino
      ) {
        throw new NotFoundException(
          'El MesProceso no tiene las relaciones completas (proceso, planta, inquilino)',
        );
      }
      exportacion.mesProceso = mesProceso;
    }

    if (updateExportacioneDto.idEnergetico) {
      const Energetico = await this.energeticoRepository.findOne({
        where: { idEnergetico: updateExportacioneDto.idEnergetico },
      });
      if (!Energetico) {
        throw new NotFoundException('Energetico no encontrado');
      }
      exportacion.energetico = Energetico;
    }

    if (updateExportacioneDto.idUnidad) {
      const Unidad = await this.unidadRepository.findOne({
        where: { idUnidad: updateExportacioneDto.idUnidad },
      });
      if (!Unidad) {
        throw new NotFoundException('Unidad no encontrada');
      }
      exportacion.unidad = Unidad;
    }
    if (updateExportacioneDto.idPais) {
      const Pais = await this.paisRepository.findOne({
        where: { idPais: updateExportacioneDto.idPais },
      });
      if (!Pais) {
        throw new NotFoundException('Pais no encontrado');
      }
      exportacion.pais = Pais;
    }

    // proceso resumen
    //extraer tcal y unidadGeneral
    const ejemploDatos = {
      idEnergetico:
        updateExportacioneDto.idEnergetico ??
        exportacion.energetico.idEnergetico ??
        0,
      idUnidad:
        updateExportacioneDto.idUnidad ?? exportacion.unidad.idUnidad ?? 0,
      cantidad: updateExportacioneDto.cantidad ?? exportacion.cantidad ?? 0,
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
      exportacion.resumenTransaccion.idResumenTransaccion,
      {
        idEnergetico: updateExportacioneDto.idEnergetico
          ? updateExportacioneDto.idEnergetico
          : exportacion.energetico.idEnergetico,
        idCategoriaRegistro: 21, // Si aplica
        cantidadEntrada: 0,
        cantidadSalida: updateExportacioneDto.cantidad
          ? updateExportacioneDto.cantidad
          : exportacion.cantidad,
        idUnidad: updateExportacioneDto.idUnidad
          ? updateExportacioneDto.idUnidad
          : exportacion.unidad.idUnidad,
        idMesProceso: updateExportacioneDto.idMesProceso
          ? updateExportacioneDto.idMesProceso
          : exportacion.mesProceso.idMesProceso,
        idProceso: exportacion.mesProceso.proceso.idProceso,
        idPlanta: exportacion.mesProceso.proceso.planta.idPlanta,
        inquilinoId:
          exportacion.mesProceso.proceso.planta.inquilino.inquilinoId,
        cantidadGeneral: resultado2.cantidadGeneral,
        teraCalorias: resultado2.cantidadTcal,
      },
    );

    const resultado = await this.exportacionRepository.save(exportacion);
    return {
      resultado,
      message: 'Exportacion actualizada correctamente',
    };
  }

  async remove(id: number) {
    const exportacion = await this.exportacionRepository.findOne({
      where: { idExportacion: id },
      relations: ['resumenTransaccion'],
    });

    if (!exportacion) {
      throw new NotFoundException('Exportación no encontrada');
    }

    await this.exportacionRepository.delete(id);

    if (exportacion.resumenTransaccion) {
      await this.resumenTransaccionService.removeRT(
        exportacion.resumenTransaccion.idResumenTransaccion,
      );
    }

    return {
      message: 'Exportación y resumen borrados correctamente',
    };
  }
}
