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
import { ResumenTransaccionService } from '../resumen-transaccion/resumen-transaccion.service';

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
    const mesProceso = await this.mesProcesoRepository.findOneBy({
      idMesProceso: createGeneracionDto.idMesProceso,
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

    const generacion = this.generacionRepository.create({
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

  async findOne(id: number) {
    const generacion = await this.generacionRepository.findOne({
      where: { idGeneracion: id },
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
      throw new NotFoundException(`Generacion con ID ${id} no encontrada`);
    }
    return generacion;
  }

  async update(id: number, updateGeneracionDto: UpdateGeneracionDto) {
    const generacion = await this.generacionRepository.findOne({
      where: { idGeneracion: id },
    });
    if (!generacion) {
      throw new NotFoundException(`Generacion con ID ${id} no encontrada`);
    }
    Object.assign(generacion, updateGeneracionDto);

    if (updateGeneracionDto.idMesProceso) {
      const mesProceso = await this.mesProcesoRepository.findOneBy({
        idMesProceso: updateGeneracionDto.idMesProceso,
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
