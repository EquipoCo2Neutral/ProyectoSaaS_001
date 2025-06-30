import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateGeneracionDto } from './dto/create-generacion.dto';
import { UpdateGeneracionDto } from './dto/update-generacion.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Generacion } from './entities/generacion.entity';
import { Repository } from 'typeorm';
import { MesProceso } from 'src/gestor/mes-proceso/entities/mes-proceso.entity';
import { Adquisicione } from '../adquisiciones/entities/adquisicione.entity';
import { Unidade } from 'src/complementos/energia/unidades/entities/unidade.entity';
import { Energetico } from 'src/complementos/energia/energeticos/entities/energetico.entity';
import { ResumenTransaccionService } from '../resumen-transaccion/resumen-transaccion.service';
import { conversorTcal } from 'src/utilties/conversor';

@Injectable()
export class GeneracionService {
  constructor(
    @InjectRepository(Generacion)
    private readonly generacionRepository: Repository<Generacion>,

    @InjectRepository(MesProceso)
    private readonly mesProcesoRepository: Repository<MesProceso>,

    @InjectRepository(Unidade)
    private readonly unidadRepository: Repository<Unidade>,
    @InjectRepository(Energetico)
    private readonly energeticoRepository: Repository<Energetico>,
    private readonly resumenTransaccionService: ResumenTransaccionService,
  ) {}

  async create(createGeneracionDto: CreateGeneracionDto) {
    const mesProceso = await this.mesProcesoRepository.findOne({
      where: {
        idMesProceso: createGeneracionDto.idMesProceso,
      },
      relations: ['proceso', 'proceso.planta', 'proceso.planta.inquilino'],
    });
    if (!mesProceso) {
      throw new NotFoundException('Mes Proceso no encontrado');
    }
    if (createGeneracionDto.idUnidad_CGB) {
      const Unidad_CGB = await this.unidadRepository.findOneBy({
        idUnidad: createGeneracionDto.idUnidad_CGB,
      });
      if (!Unidad_CGB) {
        throw new NotFoundException('Unidad CGB no encontrada');
      }
    }
    if (createGeneracionDto.idUnidad_Ci) {
      const Unidad_Ci = await this.unidadRepository.findOneBy({
        idUnidad: createGeneracionDto.idUnidad_Ci,
      });
      if (!Unidad_Ci) {
        throw new NotFoundException('Unidad CGB no encontrada');
      }
    }
    if (createGeneracionDto.idUnidad_Cena) {
      const Unidad_Cena = await this.unidadRepository.findOneBy({
        idUnidad: createGeneracionDto.idUnidad_Cena,
      });
      if (!Unidad_Cena) {
        throw new NotFoundException('Unidad CGB no encontrada');
      }
    }
    if (createGeneracionDto.idUnidad_Ce) {
      const Unidad_Ce = await this.unidadRepository.findOneBy({
        idUnidad: createGeneracionDto.idUnidad_Ce,
      });
      if (!Unidad_Ce) {
        throw new NotFoundException('Unidad CGB no encontrada');
      }
    }
    if (createGeneracionDto.idEnergetico) {
      const Unidad_Energetico = await this.energeticoRepository.findOneBy({
        idEnergetico: createGeneracionDto.idEnergetico,
      });
      if (!Unidad_Energetico) {
        throw new NotFoundException('Unidad CGB no encontrada');
      }
    }

    // proceso resumen
    //extraer tcal y unidadGeneral
    // 1. Definir condición para tecnologías 1,2,3,5
    const isTecnologiaStandard = [1, 2, 3, 5].includes(
      createGeneracionDto.idTecnologia,
    );

    const ejemploDatos = {
      idEnergetico: isTecnologiaStandard
        ? 43
        : createGeneracionDto.idTecnologia === 4
          ? (createGeneracionDto.idEnergetico ?? 0) // Convierte null/undefined a 0
          : 0,

      idUnidad: isTecnologiaStandard
        ? createGeneracionDto.idUnidad_CGB
        : createGeneracionDto.idTecnologia === 4
          ? (createGeneracionDto.idUnidad_Ce ?? 0)
          : 0,

      cantidad: isTecnologiaStandard
        ? (createGeneracionDto.cantidadGeneradaBruta ?? 0) // Convierte null/undefined a 0
        : createGeneracionDto.idTecnologia === 4
          ? (createGeneracionDto.consumoEnergetico ?? 0) // Convierte null/undefined a 0
          : 0,

      poderCalorifico: 0, // Usa número en vez de null
      humedad: 0, // Usa número en vez de null
    };

    // realizar conversion a Tcal
    const resultado2 = await conversorTcal(ejemploDatos);
    if (!resultado2) {
      throw new BadRequestException('No se pudo calcular la conversión a Tcal');
    }

    // asignar valores
    const resumenTransaccion = await this.resumenTransaccionService.createRT({
      idEnergetico: isTecnologiaStandard
        ? 43
        : createGeneracionDto.idTecnologia === 4
          ? (createGeneracionDto.idEnergetico ?? 0) // Convierte null/undefined a 0
          : 0,
      idCategoriaRegistro: createGeneracionDto.idTecnologia + 4, // Si aplica
      cantidadEntrada: isTecnologiaStandard
        ? createGeneracionDto.cantidadGeneradaBruta
        : 0,
      cantidadSalida:
        createGeneracionDto.idTecnologia === 4
          ? (createGeneracionDto.consumoEnergetico ?? 0) // Convierte null/undefined a 0
          : 0,
      idUnidad: resultado2.unidadGeneral,
      idUnidadOriginal: createGeneracionDto.idUnidad_CGB, // Asegúrate de que viene en el DTO
      idMesProceso: createGeneracionDto.idMesProceso,
      idProceso: mesProceso.proceso.idProceso, // Asegúrate de que viene en el DTO
      idPlanta: mesProceso.proceso.planta.idPlanta, // Asegúrate de que viene en el DTO
      inquilinoId: mesProceso.proceso.planta.inquilino.inquilinoId, // Asegúrate de que viene en el DTO
      cantidadGeneral: resultado2.cantidadGeneral,
      teraCalorias: resultado2.cantidadTcal,
    });

    const generacion = this.generacionRepository.create({
      resumenTransaccion: resumenTransaccion,
      idTecnologia: createGeneracionDto.idTecnologia,
      mesProceso,
      unidadCGB: { idUnidad: createGeneracionDto.idUnidad_CGB },
      unidadCI: { idUnidad: createGeneracionDto.idUnidad_Ci },
      cantidadGeneradaBruta: createGeneracionDto.cantidadGeneradaBruta,
      capacidadInstalada: createGeneracionDto.capacidadInstalada,
      cantidadEnergiaNoAprovechada:
        createGeneracionDto.cantidadEnergiaNoAprovechada,
      Observaciones: createGeneracionDto.Observaciones,
      Tipo: createGeneracionDto.Tipo,
      consumoEnergetico: createGeneracionDto.consumoEnergetico,
    });

    if (createGeneracionDto.idUnidad_Cena) {
      generacion.unidadCENA = {
        idUnidad: createGeneracionDto.idUnidad_Cena,
      } as Unidade;
    }

    if (createGeneracionDto.idUnidad_Ce) {
      generacion.unidadCE = {
        idUnidad: createGeneracionDto.idUnidad_Ce,
      } as Unidade;
    }

    if (createGeneracionDto.idEnergetico) {
      generacion.energetico = {
        idEnergetico: createGeneracionDto.idEnergetico,
      } as Energetico;
    }

    const respuesta = await this.generacionRepository.save(generacion);

    return {
      message: 'Generacion registrada correctamente',
      data: respuesta,
    };
  }

  async findAll(id: string): Promise<Generacion[]> {
    const generacion = await this.generacionRepository.find({
      where: { mesProceso: { idMesProceso: id } },
      relations: [
        'mesProceso',
        'unidadCGB',
        'unidadCI',
        'unidadCENA',
        'unidadCE',
        'energetico',
      ],
    });
    if (!generacion) {
      throw new NotFoundException('Generacion no encontrada');
    }
    return generacion;
  }

  async findOne(id: number, inquilinoId: string) {
    const generacion = await this.generacionRepository.findOne({
      where: {
        idGeneracion: id,
        mesProceso: {
          proceso: {
            planta: {
              inquilino: { inquilinoId: inquilinoId },
            },
          },
        },
      },
      relations: [
        'mesProceso',
        'energetico',
        'unidadCE',
        'unidadCENA',
        'unidadCI',
        'unidadCGB',
      ],
    });
    if (!generacion) {
      throw new NotFoundException(
        `Generacion con ID ${id} no encontrada o no pertenece al inquilino`,
      );
    }
    return generacion;
  }

  async update(id: number, updateGeneracionDto: UpdateGeneracionDto) {
    const generacion = await this.generacionRepository.findOne({
      where: { idGeneracion: id },
      relations: [
        'energetico',
        'unidadCGB',
        'unidadCI',
        'unidadCENA',
        'unidadCE',
        'mesProceso',
        'mesProceso.proceso',
        'mesProceso.proceso.planta',
        'mesProceso.proceso.planta.inquilino',
        'resumenTransaccion',
      ],
    });
    if (!generacion) {
      throw new NotFoundException(`Generacion con ID ${id} no encontrada`);
    }
    Object.assign(generacion, updateGeneracionDto);

    if (updateGeneracionDto.idMesProceso) {
      const mesProceso = await this.mesProcesoRepository.findOne({
        where: {
          idMesProceso: updateGeneracionDto.idMesProceso,
        },
        relations: ['proceso', 'proceso.planta', 'proceso.planta.inquilino'],
      });
      if (!mesProceso) {
        throw new NotFoundException('Mes Proceso no encontrado');
      }
      generacion.mesProceso = mesProceso;
    }
    if (updateGeneracionDto.idUnidad_CGB) {
      const Unidad_CGB = await this.unidadRepository.findOneBy({
        idUnidad: updateGeneracionDto.idUnidad_CGB,
      });
      if (!Unidad_CGB) {
        throw new NotFoundException('Unidad CGB no encontrada');
      }
      generacion.unidadCGB = Unidad_CGB;
    }
    if (updateGeneracionDto.idUnidad_Ci) {
      const Unidad_Ci = await this.unidadRepository.findOneBy({
        idUnidad: updateGeneracionDto.idUnidad_Ci,
      });
      if (!Unidad_Ci) {
        throw new NotFoundException('Unidad CGB no encontrada');
      }
      generacion.unidadCI = Unidad_Ci;
    }
    if (updateGeneracionDto.idUnidad_Cena) {
      const Unidad_Cena = await this.unidadRepository.findOneBy({
        idUnidad: updateGeneracionDto.idUnidad_Cena,
      });
      if (!Unidad_Cena) {
        throw new NotFoundException('Unidad CGB no encontrada');
      }
      generacion.unidadCENA = Unidad_Cena;
    }
    if (updateGeneracionDto.idUnidad_Ce) {
      const Unidad_Ce = await this.unidadRepository.findOneBy({
        idUnidad: updateGeneracionDto.idUnidad_Ce,
      });
      if (!Unidad_Ce) {
        throw new NotFoundException('Unidad CGB no encontrada');
      }
      generacion.unidadCE = Unidad_Ce;
    }
    if (updateGeneracionDto.idEnergetico !== undefined) {
      if (updateGeneracionDto.idEnergetico === null) {
        generacion.energetico = null;
      } else {
        const energetico = await this.energeticoRepository.findOne({
          where: { idEnergetico: updateGeneracionDto.idEnergetico },
        });

        if (!energetico) {
          throw new NotFoundException(
            `Energético con ID ${updateGeneracionDto.idEnergetico} no encontrado`,
          );
        }

        generacion.energetico = energetico;
      }
    }

    // proceso resumen
    //extraer tcal y unidadGeneral
    // 1. Definir condición para tecnologías 1,2,3,5
    const idTecnologias =
      updateGeneracionDto.idTecnologia ?? generacion.idTecnologia;
    const isTecnologiaStandard = [1, 2, 3, 5].includes(idTecnologias);

    const ejemploDatos = {
      idEnergetico: isTecnologiaStandard
        ? 43
        : updateGeneracionDto.idTecnologia === 4
          ? (updateGeneracionDto.idEnergetico ?? 0) // Convierte null/undefined a 0
          : 0,

      idUnidad: isTecnologiaStandard
        ? (updateGeneracionDto.idUnidad_CGB ?? 0)
        : updateGeneracionDto.idTecnologia === 4
          ? (updateGeneracionDto.idUnidad_Ce ?? 0)
          : 0,

      cantidad: isTecnologiaStandard
        ? (updateGeneracionDto.cantidadGeneradaBruta ?? 0) // Convierte null/undefined a 0
        : updateGeneracionDto.idTecnologia === 4
          ? (updateGeneracionDto.consumoEnergetico ?? 0) // Convierte null/undefined a 0
          : 0,

      poderCalorifico: 0, // Usa número en vez de null
      humedad: 0, // Usa número en vez de null
    };

    // realizar conversion a Tcal
    const resultado2 = await conversorTcal(ejemploDatos);
    if (!resultado2) {
      throw new BadRequestException('No se pudo calcular la conversión a Tcal');
    }

    // asignar valores
    const resumenTransaccion = await this.resumenTransaccionService.updateRT(
      generacion.resumenTransaccion.idResumenTransaccion,
      {
        idEnergetico: isTecnologiaStandard
          ? 43
          : updateGeneracionDto.idTecnologia === 4
            ? (updateGeneracionDto.idEnergetico ?? 0) // Convierte null/undefined a 0
            : 0,
        idCategoriaRegistro:
          updateGeneracionDto.idTecnologia !== undefined
            ? updateGeneracionDto.idTecnologia + 10
            : generacion.idTecnologia + 10, // Si aplica
        cantidadEntrada: isTecnologiaStandard
          ? updateGeneracionDto.cantidadGeneradaBruta
          : 0,
        cantidadSalida:
          updateGeneracionDto.idTecnologia === 4
            ? (updateGeneracionDto.consumoEnergetico ?? 0) // Convierte null/undefined a 0
            : 0,
        idUnidad: resultado2.unidadGeneral,
        idUnidadOriginal: updateGeneracionDto.idUnidad_CGB, // Asegúrate de que viene en el DTO
        idMesProceso: updateGeneracionDto.idMesProceso,
        idProceso: generacion.mesProceso.proceso.idProceso, // Asegúrate de que viene en el DTO
        idPlanta: generacion.mesProceso.proceso.planta.idPlanta, // Asegúrate de que viene en el DTO
        inquilinoId: generacion.mesProceso.proceso.planta.inquilino.inquilinoId, // Asegúrate de que viene en el DTO
        cantidadGeneral: resultado2.cantidadGeneral,
        teraCalorias: resultado2.cantidadTcal,
      },
    );

    const resultado = await this.generacionRepository.save(generacion);

    return {
      resultado,
      message: 'Generacion actualizada correctamente',
    };
  }

  async remove(id: number) {
    const generacion = await this.generacionRepository.findOne({
      where: { idGeneracion: id },
      relations: ['resumenTransaccion'],
    });

    if (!generacion) {
      throw new NotFoundException('Generación no encontrada');
    }

    // Elimina primero la generación
    await this.generacionRepository.delete(id);

    // Luego elimina el resumen si existe
    if (generacion.resumenTransaccion) {
      await this.resumenTransaccionService.removeRT(
        generacion.resumenTransaccion.idResumenTransaccion,
      );
    }

    return {
      message: 'Generación y resumen borrados correctamente',
    };
  }
}
