import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
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
import { Pais } from 'src/complementos/paises/entities/paise.entity';
import { conversorTcal } from 'src/utilties/conversor';
import { ResumenTransaccion } from '../resumen-transaccion/entities/resumen-transaccion.entity';
import { ResumenTransaccionService } from '../resumen-transaccion/resumen-transaccion.service';

@Injectable()
export class AdquisicionesService {
  constructor(
    @InjectRepository(Adquisicione)
    private readonly adquisicioneRepository: Repository<Adquisicione>,

    @InjectRepository(MesProceso)
    private readonly mesProcesoRepository: Repository<MesProceso>,

    @InjectRepository(Transaccione)
    private readonly transaccioneRepository: Repository<Transaccione>,
    @InjectRepository(GrupoEnergetico)
    private readonly grupoEnergeticoRepository: Repository<GrupoEnergetico>,
    @InjectRepository(Energetico)
    private readonly energeticoRepository: Repository<Energetico>,
    @InjectRepository(Unidade)
    private readonly unidadRepository: Repository<Unidade>,
    @InjectRepository(Pais) private readonly paisRepository: Repository<Pais>,
    @InjectRepository(ResumenTransaccion)
    private readonly rTRepository: Repository<ResumenTransaccion>,
    private readonly resumenTransaccionService: ResumenTransaccionService,
  ) {}

  async create(createAdquisicioneDto: CreateAdquisicioneDto) {
    const mesProceso = await this.mesProcesoRepository.findOne({
      where: { idMesProceso: createAdquisicioneDto.idMesProceso },
      relations: ['proceso', 'proceso.planta', 'proceso.planta.inquilino'],
    });

    if (!mesProceso) {
      throw new NotFoundException('Mes Proceso no encontrado');
    }
    //extraer tcal y unidadGeneral
    const ejemploDatos = {
      idEnergetico: createAdquisicioneDto.idEnergetico,
      idUnidad: createAdquisicioneDto.idUnidad, //kg
      cantidad: createAdquisicioneDto.Cantidad, //kg
      poderCalorifico: createAdquisicioneDto.poderCalorifico
        ? createAdquisicioneDto.poderCalorifico
        : null,
      humedad: createAdquisicioneDto.porcentajeHumedad
        ? createAdquisicioneDto.porcentajeHumedad
        : null,
    };

    const resultado2 = await conversorTcal(ejemploDatos);

    if (!resultado2) {
      throw new BadRequestException('No se pudo calcular la conversión a Tcal');
    }

    if (createAdquisicioneDto.idTransaccion) {
      const transaccion = await this.transaccioneRepository.findOneBy({
        idTransaccion: createAdquisicioneDto.idTransaccion,
      });

      if (!transaccion) {
        throw new NotFoundException('Transacción no encontrada');
      }
    }
    if (createAdquisicioneDto.idGrupoEnergetico) {
      const grupoEnergetico = await this.grupoEnergeticoRepository.findOneBy({
        idGrupoEnergetico: createAdquisicioneDto.idGrupoEnergetico,
      });

      if (!grupoEnergetico) {
        throw new NotFoundException('Grupo energetico no encontrado');
      }
    }
    if (createAdquisicioneDto.idEnergetico) {
      const Energetico = await this.energeticoRepository.findOneBy({
        idEnergetico: createAdquisicioneDto.idEnergetico,
      });

      if (!Energetico) {
        throw new NotFoundException('Energetico no encontrado');
      }
    }
    if (createAdquisicioneDto.idUnidad) {
      const Unidad = await this.unidadRepository.findOneBy({
        idUnidad: createAdquisicioneDto.idUnidad,
      });

      if (!Unidad) {
        throw new NotFoundException('Unidad no encontrada');
      }
    }

    const resumenTransaccion = await this.resumenTransaccionService.createRT({
      idEnergetico: createAdquisicioneDto.idEnergetico,
      idCategoriaRegistro: createAdquisicioneDto.idTransaccion, // Si aplica
      cantidadEntrada: createAdquisicioneDto.Cantidad,
      cantidadSalida: 0,
      idUnidad: createAdquisicioneDto.idUnidad,
      idMesProceso: createAdquisicioneDto.idMesProceso,
      idProceso: mesProceso.proceso.idProceso, // Asegúrate de que viene en el DTO
      idPlanta: mesProceso.proceso.planta.idPlanta, // Asegúrate de que viene en el DTO
      inquilinoId: mesProceso.proceso.planta.inquilino.inquilinoId, // Asegúrate de que viene en el DTO
      cantidadGeneral: resultado2.cantidadGeneral,
      teraCalorias: resultado2.cantidadTcal,
    });

    const adquisicion = this.adquisicioneRepository.create({
      resumenTransaccion: resumenTransaccion,
      mesProceso,
      transaccion: {
        idTransaccion: createAdquisicioneDto.idTransaccion,
      } as Transaccione,
      grupoEnergetico: {
        idGrupoEnergetico: createAdquisicioneDto.idGrupoEnergetico,
      } as GrupoEnergetico,
      energetico: {
        idEnergetico: createAdquisicioneDto.idEnergetico,
      } as Energetico,
      unidad: { idUnidad: createAdquisicioneDto.idUnidad } as Unidade,
      Cantidad: createAdquisicioneDto.Cantidad,
      cantidadInicial: createAdquisicioneDto.cantidadInicial,
      cantidadFinal: createAdquisicioneDto.cantidadFinal,
      empresaOrigen: createAdquisicioneDto.empresaOrigen,
      poderCalorifico: createAdquisicioneDto.poderCalorifico,
      porcentajeHumedad: createAdquisicioneDto.porcentajeHumedad,
      compraMercadoSpot: createAdquisicioneDto.compraMercadoSpot,
    });

    if (createAdquisicioneDto.idPaisOrigen) {
      adquisicion.paisOrigen = {
        idPais: createAdquisicioneDto.idPaisOrigen,
      } as Pais;
    }

    const resultado = await this.adquisicioneRepository.save(adquisicion);

    return {
      message: `Adquisicion registrada correctamente desde backend ${resultado2?.cantidadTcal} and ${resultado2?.cantidadGeneral}`,
      data: resultado,
    };
  }

  async findAll(id: string): Promise<Adquisicione[]> {
    const adquisiciones = await this.adquisicioneRepository.find({
      where: { mesProceso: { idMesProceso: id } },
      relations: [
        'mesProceso',
        'transaccion',
        'grupoEnergetico',
        'energetico',
        'unidad',
      ],
    });
    if (!adquisiciones || adquisiciones.length === 0) {
      throw new NotFoundException(
        `No se encontraron adquisiciones para el mes de proceso con ID ${id}`,
      );
    }

    return adquisiciones;
  }

  async findOne(id: number): Promise<Adquisicione> {
    const adquisicion = await this.adquisicioneRepository.findOne({
      where: { idAdquisicion: id },
      relations: [
        'mesProceso',
        'transaccion',
        'grupoEnergetico',
        'energetico',
        'paisOrigen',
        'unidad',
      ],
    });

    if (!adquisicion) {
      throw new NotFoundException(`Adquisición con ID ${id} no encontrada`);
    }

    return adquisicion;
  }

  async update(id: number, updateAdquisicioneDto: UpdateAdquisicioneDto) {
    // Buscar la adquisición existente
    const adquisicion = await this.adquisicioneRepository.findOne({
      where: { idAdquisicion: id },
      relations: [
        'energetico',
        'unidad',
        'mesProceso',
        'mesProceso.proceso',
        'mesProceso.proceso.planta',
        'mesProceso.proceso.planta.inquilino',
        'transaccion',
        'resumenTransaccion'
      ],

    });
    if (!adquisicion) {
      throw new NotFoundException(`Adquisición con ID ${id} no encontrada`);
    }
    // Asignar los cambios del DTO
    Object.assign(adquisicion, updateAdquisicioneDto);
    // Validar y asociar MesProceso si viene en el DTO
    if (updateAdquisicioneDto.idMesProceso) {
      const mesProceso = await this.mesProcesoRepository.findOne({
        where: { idMesProceso: updateAdquisicioneDto.idMesProceso },
        relations: ['proceso', 'proceso.planta', 'proceso.planta.inquilino'],
      });

      if (!mesProceso) {
        throw new NotFoundException(
          `MesProceso con ID ${updateAdquisicioneDto.idMesProceso} no encontrado`,
        );
      }
      // Validar que las relaciones necesarias existen
      if (!mesProceso.proceso || !mesProceso.proceso.planta || !mesProceso.proceso.planta.inquilino) {
        throw new NotFoundException(
          'El MesProceso no tiene las relaciones completas (proceso, planta, inquilino)',
        );
      }

      adquisicion.mesProceso = mesProceso;
    }

    if (updateAdquisicioneDto.idTransaccion) {
      const transaccion = await this.transaccioneRepository.findOne({
        where: { idTransaccion: updateAdquisicioneDto.idTransaccion },
      });
      if (!transaccion) {
        throw new NotFoundException(
          `Transacción con ID ${updateAdquisicioneDto.idTransaccion} no encontrada`,
        );
      }
      adquisicion.transaccion = transaccion;
    }

    if (updateAdquisicioneDto.idGrupoEnergetico) {
      const grupoEnergetico = await this.grupoEnergeticoRepository.findOne({
        where: { idGrupoEnergetico: updateAdquisicioneDto.idGrupoEnergetico },
      });
      if (!grupoEnergetico) {
        throw new NotFoundException(
          `Grupo energético con ID ${updateAdquisicioneDto.idGrupoEnergetico} no encontrado`,
        );
      }
      adquisicion.grupoEnergetico = grupoEnergetico;
    }

    if (updateAdquisicioneDto.idEnergetico) {
      const energetico = await this.energeticoRepository.findOne({
        where: { idEnergetico: updateAdquisicioneDto.idEnergetico },
      });
      if (!energetico) {
        throw new NotFoundException(
          `Energetico con ID ${updateAdquisicioneDto.idEnergetico} no encontrado`,
        );
      }
      adquisicion.energetico = energetico;
    }
    if (updateAdquisicioneDto.idUnidad) {
      const unidad = await this.unidadRepository.findOne({
        where: { idUnidad: updateAdquisicioneDto.idUnidad },
      });
      if (!unidad) {
        throw new NotFoundException(
          `Unidad con ID ${updateAdquisicioneDto.idUnidad} no encontrada`,
        );
      }
      adquisicion.unidad = unidad;
    }
    if (updateAdquisicioneDto.Cantidad) {
      if (updateAdquisicioneDto.Cantidad < 0) {
        throw new NotFoundException('La cantidad no puede ser menor que 0');
      }
      adquisicion.Cantidad = updateAdquisicioneDto.Cantidad;
    }

    if (updateAdquisicioneDto.cantidadInicial) {
      if (updateAdquisicioneDto.cantidadInicial < 0) {
        throw new NotFoundException(
          'La cantidadInicial no puede ser menor que 0',
        );
      }
      adquisicion.cantidadInicial = updateAdquisicioneDto.cantidadInicial;
    }

    if (updateAdquisicioneDto.cantidadFinal) {
      if (updateAdquisicioneDto.cantidadFinal < 0) {
        throw new NotFoundException(
          'La cantidadFinal no puede ser menor que 0',
        );
      }
      adquisicion.cantidadFinal = updateAdquisicioneDto.cantidadFinal;
    }

    if (updateAdquisicioneDto.idPaisOrigen !== undefined) {
      if (updateAdquisicioneDto.idPaisOrigen === null) {
        adquisicion.paisOrigen = null;
      } else {
        const pais = await this.paisRepository.findOne({
          where: { idPais: updateAdquisicioneDto.idPaisOrigen },
        });

        if (!pais) {
          throw new NotFoundException(
            `País con ID ${updateAdquisicioneDto.idPaisOrigen} no encontrado`,
          );
        }

        adquisicion.paisOrigen = pais;
      }
    }
 // proceso resumen
      //extraer tcal y unidadGeneral
    const ejemploDatos = {
      idEnergetico: updateAdquisicioneDto.idEnergetico ?? adquisicion.energetico.idEnergetico ?? 0,
      idUnidad: updateAdquisicioneDto.idUnidad ?? adquisicion.unidad.idUnidad ?? 0, 
      cantidad: updateAdquisicioneDto.Cantidad ?? adquisicion.Cantidad ?? 0, 
      poderCalorifico: updateAdquisicioneDto.poderCalorifico ?? adquisicion.poderCalorifico ?? 0,
      humedad: updateAdquisicioneDto.porcentajeHumedad ?? adquisicion.porcentajeHumedad ?? 0,
    };
    // realizar conversion a Tcal
    const resultado2 = await conversorTcal(ejemploDatos);
    if (!resultado2) {
      throw new BadRequestException('No se pudo calcular la conversión a Tcal');
    }

    
    // asignar valores
    await this.resumenTransaccionService.updateRT(adquisicion.resumenTransaccion.idResumenTransaccion, {
      idEnergetico: updateAdquisicioneDto.idEnergetico ? updateAdquisicioneDto.idEnergetico : adquisicion.energetico.idEnergetico,
      idCategoriaRegistro: updateAdquisicioneDto.idTransaccion ? updateAdquisicioneDto.idTransaccion : adquisicion.transaccion.idTransaccion, // Si aplica
      cantidadEntrada: updateAdquisicioneDto.Cantidad ? updateAdquisicioneDto.Cantidad : adquisicion.Cantidad,
      cantidadSalida: 0,
      idUnidad: updateAdquisicioneDto.idUnidad ? updateAdquisicioneDto.idUnidad : adquisicion.unidad.idUnidad,
      idMesProceso: updateAdquisicioneDto.idMesProceso ? updateAdquisicioneDto.idMesProceso : adquisicion.mesProceso.idMesProceso,
      idProceso: adquisicion.mesProceso.proceso.idProceso, // Asegúrate de que viene en el DTO
      idPlanta: adquisicion.mesProceso.proceso.planta.idPlanta, // Asegúrate de que viene en el DTO
      inquilinoId: adquisicion.mesProceso.proceso.planta.inquilino.inquilinoId, // Asegúrate de que viene en el DTO
      cantidadGeneral: resultado2.cantidadGeneral,
      teraCalorias: resultado2.cantidadTcal,
    });



    const resultado = await this.adquisicioneRepository.save(adquisicion);

    return {
      resultado,
      message: 'Adquisición actualizada correctamente',
    };
  } 

  async findEnergeticosByMesProceso(idMesProceso: string) {
    return this.adquisicioneRepository
      .createQueryBuilder('adq')
      .innerJoin('adq.energetico', 'energetico')
      .where('adq.mesProceso = :idMesProceso', { idMesProceso })
      .select([
        'energetico.idEnergetico AS id',
        'energetico.nombreEnergetico AS nombre',
      ])
      .distinct(true)
      .getRawMany();
  }

  async findEnergeticosByMesProcesoConTransaccion4(idMesProceso: string) {
    return this.adquisicioneRepository
      .createQueryBuilder('adq')
      .innerJoin('adq.energetico', 'energetico')
      .innerJoin('adq.transaccion', 'transaccion')
      .where('adq.mesProceso = :idMesProceso', { idMesProceso })
      .andWhere('transaccion.idTransaccion = :idTransaccion', {
        idTransaccion: 4,
      })
      .select([
        'energetico.idEnergetico AS id',
        'energetico.nombreEnergetico AS nombre',
      ])
      .distinct(true)
      .getRawMany();
  }

  async remove(id: number) {
    const deleteAdquisicion = await this.adquisicioneRepository.delete(id);
    return {
      deleteAdquisicion,
      message: 'Adquisicion Borrada Correctamente',
    };
  }
}
