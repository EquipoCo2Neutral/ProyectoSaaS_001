import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUsosFinaleDto } from './dto/create-usos-finale.dto';
import { UpdateUsosFinaleDto } from './dto/update-usos-finale.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { UsosFinale } from './entities/usos-finale.entity';
import { Repository } from 'typeorm';
import { MesProceso } from 'src/gestor/mes-proceso/entities/mes-proceso.entity';
import { Energetico } from 'src/complementos/energia/energeticos/entities/energetico.entity';
import { CategoriaUf } from 'src/complementos/energia/categoria-uf/entities/categoria-uf.entity';
import { TipoUf } from 'src/complementos/energia/tipo-uf/entities/tipo-uf.entity';
import { Unidade } from 'src/complementos/energia/unidades/entities/unidade.entity';
import { ResumenTransaccion } from '../resumen-transaccion/entities/resumen-transaccion.entity';
import { conversorTcal } from 'src/utilties/conversor';
import { ResumenTransaccionService } from '../resumen-transaccion/resumen-transaccion.service';

@Injectable()
export class UsosFinalesService {
  constructor(
    @InjectRepository(UsosFinale)
    private readonly usoFinaleRepository: Repository<UsosFinale>,
    @InjectRepository(MesProceso)
    private readonly mesProcesoRepository: Repository<MesProceso>,
    @InjectRepository(Energetico)
    private readonly energeticoRepository: Repository<Energetico>,
    @InjectRepository(CategoriaUf)
    private readonly categoriaUfRepository: Repository<CategoriaUf>,
    @InjectRepository(TipoUf)
    private readonly tipoUfRepository: Repository<TipoUf>,
    @InjectRepository(Unidade)
    private readonly unidadeRepository: Repository<Unidade>,
    @InjectRepository(ResumenTransaccion)
    private readonly rTRepository: Repository<ResumenTransaccion>,
    private readonly resumenTransaccionService: ResumenTransaccionService,
  ) {}

  async create(createUsosFinaleDto: CreateUsosFinaleDto) {
    //validar mes proceso
    const mesProceso = await this.mesProcesoRepository.findOne({
      where: {
        idMesProceso: createUsosFinaleDto.idMesProceso,
      },
      relations: ['proceso', 'proceso.planta', 'proceso.planta.inquilino'],
    });
    if (!mesProceso) {
      throw new NotFoundException('Mes Proceso no encontrado');
    }
    //validar energético
    if (createUsosFinaleDto.idEnergetico) {
      const energetico = await this.energeticoRepository.findOneBy({
        idEnergetico: createUsosFinaleDto.idEnergetico,
      });
      if (!energetico) {
        throw new NotFoundException('Energético invalido');
      }
    }

    //validar categoría uso final

    if (createUsosFinaleDto.idCategoriaUF) {
      const categoriaUf = await this.categoriaUfRepository.findOneBy({
        idCategoriaUF: createUsosFinaleDto.idCategoriaUF,
      });

      if (!categoriaUf) {
        throw new NotFoundException('Categoria Invalida');
      }
    }

    //validar tipo uso final
    if (createUsosFinaleDto.idTipoUF) {
      const tipoUf = await this.tipoUfRepository.findOneBy({
        idTipoUF: createUsosFinaleDto.idTipoUF,
      });

      if (!tipoUf) {
        throw new NotFoundException('Tipo invalido');
      }
    }

    //validar unidad

    if (createUsosFinaleDto.idUnidad) {
      const unidad = await this.unidadeRepository.findOneBy({
        idUnidad: createUsosFinaleDto.idUnidad,
      });

      if (!unidad) {
        throw new NotFoundException('Unidad Invalida');
      }
    }


    // proceso resumen
    //extraer tcal y unidadGeneral
    const ejemploDatos = {
      idEnergetico: createUsosFinaleDto.idEnergetico ?? 0,
      idUnidad: createUsosFinaleDto.idUnidad ?? 0,
      cantidad: createUsosFinaleDto.cantidad ?? null,
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
      idEnergetico: createUsosFinaleDto.idEnergetico,
      idCategoriaRegistro: createUsosFinaleDto.idCategoriaUF + 10, // Si aplica
      cantidadEntrada: 0,
      cantidadSalida: createUsosFinaleDto.cantidad,
      idUnidad: resultado2.unidadGeneral,
      idUnidadOriginal: createUsosFinaleDto.idUnidad,
      idMesProceso: createUsosFinaleDto.idMesProceso,
      idProceso: mesProceso.proceso.idProceso, // Asegúrate de que viene en el DTO
      idPlanta: mesProceso.proceso.planta.idPlanta, // Asegúrate de que viene en el DTO
      inquilinoId: mesProceso.proceso.planta.inquilino.inquilinoId, // Asegúrate de que viene en el DTO
      cantidadGeneral: resultado2.cantidadGeneral,
      teraCalorias: resultado2.cantidadTcal,
    });


    const usoFinal = this.usoFinaleRepository.create({
      resumenTransaccion: resumenTransaccion,
      cantidad: createUsosFinaleDto.cantidad,
      detalle: createUsosFinaleDto.detalle,
      tipo: createUsosFinaleDto.tipo,
      mesProceso,
      energetico: {
        idEnergetico: createUsosFinaleDto.idEnergetico,
      } as Energetico,
      categoriaUF: {
        idCategoriaUF: createUsosFinaleDto.idCategoriaUF,
      } as CategoriaUf,
      unidad: { idUnidad: createUsosFinaleDto.idUnidad } as Unidade,
    });
    if (createUsosFinaleDto.idTipoUF) {
      usoFinal.tipoUF = {
        idTipoUF: createUsosFinaleDto.idTipoUF,
      } as TipoUf;
    }

    const resultado = await this.usoFinaleRepository.save(usoFinal);
    return {
      message: 'Uso final registrado correctamente',
      data: resultado,
    };
  }

  async findAll(id: string): Promise<UsosFinale[]> {
    const usoFinal = await this.usoFinaleRepository.find({
      where: { mesProceso: { idMesProceso: id } },
      relations: [
        'mesProceso',
        'energetico',
        'categoriaUF',
        'tipoUF',
        'unidad',
      ],
    });
    if (!usoFinal) {
      throw new NotFoundException('Uso Final no encontrado');
    }
    return usoFinal;
  }

  async findOne(id: number) {
    const usoFinal = await this.usoFinaleRepository.findOne({
      where: { idUsoFinal: id },

      relations: [
        'mesProceso',
        'energetico',
        'categoriaUF',
        'tipoUF',
        'unidad',
      ],
    });
    if (!usoFinal) {
      throw new NotFoundException('Uso Final no encontrado');
    }

    return usoFinal;
  }

  async update(id: number, updateUsosFinaleDto: UpdateUsosFinaleDto) {
    const usoFinal = await this.usoFinaleRepository.findOne({
      where: { idUsoFinal: id },
      relations: [
        'energetico',
        'unidad',
        'mesProceso',
        'mesProceso.proceso',
        'mesProceso.proceso.planta',
        'mesProceso.proceso.planta.inquilino',
        'resumenTransaccion',
        'categoriaUF',
      ],
    });
    if (!usoFinal) {
      throw new NotFoundException('Uso Final no encontrado');
    }
    Object.assign(usoFinal, updateUsosFinaleDto);

    if (updateUsosFinaleDto.idMesProceso) {
      const mesProceso = await this.mesProcesoRepository.findOne({
        where: {
          idMesProceso: updateUsosFinaleDto.idMesProceso,
        },
        relations: ['proceso', 'proceso.planta', 'proceso.planta.inquilino'],
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

      usoFinal.mesProceso = mesProceso;
    }

    if (updateUsosFinaleDto.idEnergetico) {
      const energetico = await this.energeticoRepository.findOneBy({
        idEnergetico: updateUsosFinaleDto.idEnergetico,
      });
      if (!energetico) {
        throw new NotFoundException('Energetico no encontrado');
      }
      usoFinal.energetico = energetico;
    }

    if (updateUsosFinaleDto.idCategoriaUF) {
      const categoriaUf = await this.categoriaUfRepository.findOneBy({
        idCategoriaUF: updateUsosFinaleDto.idCategoriaUF,
      });
      if (!categoriaUf) {
        throw new NotFoundException('Categoria no encontrada');
      }
      usoFinal.categoriaUF = categoriaUf;
    }

    if (updateUsosFinaleDto.idTipoUF) {
      const tipoUf = await this.tipoUfRepository.findOneBy({
        idTipoUF: updateUsosFinaleDto.idTipoUF,
      });
      if (!tipoUf) {
        throw new NotFoundException('Tipo no encontrado');
      }
      usoFinal.tipoUF = tipoUf;
    }

    if (updateUsosFinaleDto.idUnidad) {
      const unidad = await this.unidadeRepository.findOneBy({
        idUnidad: updateUsosFinaleDto.idUnidad,
      });
      if (!unidad) {
        throw new NotFoundException('Unidad no encontrada');
      }
      usoFinal.unidad = unidad;
    }

    // proceso resumen
    //extraer tcal y unidadGeneral
    const ejemploDatos = {
      idEnergetico:
        updateUsosFinaleDto.idEnergetico ??
        usoFinal.energetico.idEnergetico ??
        0,
      idUnidad: updateUsosFinaleDto.idUnidad ?? usoFinal.unidad.idUnidad ?? 0,
      cantidad: updateUsosFinaleDto.cantidad ?? usoFinal.cantidad ?? null,
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
      usoFinal.resumenTransaccion.idResumenTransaccion,
      {
        idEnergetico: updateUsosFinaleDto.idEnergetico
          ? updateUsosFinaleDto.idEnergetico
          : usoFinal.energetico.idEnergetico,
        idCategoriaRegistro:
          updateUsosFinaleDto.idCategoriaUF !== undefined
            ? updateUsosFinaleDto.idCategoriaUF + 10
            : usoFinal.categoriaUF.idCategoriaUF + 10, // Si aplica
        cantidadEntrada: 0,
        cantidadSalida: updateUsosFinaleDto.cantidad
          ? updateUsosFinaleDto.cantidad
          : usoFinal.cantidad,
        idUnidad: resultado2.unidadGeneral,
        idUnidadOriginal: updateUsosFinaleDto.idUnidad
          ? updateUsosFinaleDto.idUnidad
          : usoFinal.unidad.idUnidad,
        idMesProceso: updateUsosFinaleDto.idMesProceso
          ? updateUsosFinaleDto.idMesProceso
          : usoFinal.mesProceso.idMesProceso,
        idProceso: usoFinal.mesProceso.proceso.idProceso, // Asegúrate de que viene en el DTO
        idPlanta: usoFinal.mesProceso.proceso.planta.idPlanta, // Asegúrate de que viene en el DTO
        inquilinoId: usoFinal.mesProceso.proceso.planta.inquilino.inquilinoId, // Asegúrate de que viene en el DTO
        cantidadGeneral: resultado2.cantidadGeneral,
        teraCalorias: resultado2.cantidadTcal,
      },
    );

    const resultado = await this.usoFinaleRepository.save(usoFinal);

    return {
      resultado,
      message: 'Uso Final Actualizado Correctamente',
    };
  }

  async remove(id: number) {
    const usoFinal = await this.usoFinaleRepository.findOne({
      where: { idUsoFinal: id },
      relations: ['resumenTransaccion'],
    });

    if (!usoFinal) {
      throw new NotFoundException('Uso Final no encontrado');
    }

    // Elimina primero el uso final
    await this.usoFinaleRepository.delete(id);

    // Luego elimina el resumen si existe
    if (usoFinal.resumenTransaccion) {
      await this.resumenTransaccionService.removeRT(
        usoFinal.resumenTransaccion.idResumenTransaccion,
      );
    }

    return {
      message: 'Uso Final y resumen borrados correctamente',
    };
  }
}
