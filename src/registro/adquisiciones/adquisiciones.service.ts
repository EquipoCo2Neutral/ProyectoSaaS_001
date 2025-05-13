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
import { Pais } from 'src/complementos/paises/entities/paise.entity';

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
  ) {}

  async create(createAdquisicioneDto: CreateAdquisicioneDto) {
    const mesProceso = await this.mesProcesoRepository.findOneBy({
      idMesProceso: createAdquisicioneDto.idMesProceso,
    });

    if (!mesProceso) {
      throw new NotFoundException('Mes Proceso no encontrado');
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

    const adquisicion = this.adquisicioneRepository.create({
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
      message: 'Adquisicion registrada correctamente',
      data: resultado,
    };
  }

  async findAll(id: string): Promise<Adquisicione[]> {
    const adquisiciones = await this.adquisicioneRepository.find({where: {mesProceso: { idMesProceso: id }}});
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
      relations: ['mesProceso'],
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
      });

      if (!mesProceso) {
        throw new NotFoundException(
          `MesProceso con ID ${updateAdquisicioneDto.idMesProceso} no encontrado`,
        );
      }
      adquisicion.mesProceso = mesProceso;
    }

    return await this.adquisicioneRepository.save(adquisicion);
  }

  remove(id: number) {
    return `This action removes a #${id} adquisicione`;
  }
}
