import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateExportacioneDto } from './dto/create-exportacione.dto';
import { UpdateExportacioneDto } from './dto/update-exportacione.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Exportacione } from './entities/exportacione.entity';
import { Repository } from 'typeorm';
import { MesProceso } from 'src/gestor/mes-proceso/entities/mes-proceso.entity';
import { Pais } from 'src/complementos/paises/entities/paise.entity';
import { Unidade } from 'src/complementos/energia/unidades/entities/unidade.entity';
import { Energetico } from 'src/complementos/energia/energeticos/entities/energetico.entity';

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
  ) {}

  async create(createExportacioneDto: CreateExportacioneDto) {
    const mesProceso = await this.mesProcesoRepository.findOneBy({
      idMesProceso: createExportacioneDto.idMesProceso,
    });

    if (!mesProceso) {
      throw new NotFoundException('Mes Proceso no encontrado');
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

    const exportacion = this.exportacionRepository.create({
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
    const exportaciones = await this.exportacionRepository.find({where: {mesProceso: { idMesProceso: id }} ,relations: ['mesProceso', 'energetico', 'unidad', 'pais']});
    if (!exportaciones) {
      throw new NotFoundException('No hay exportaciones registradas');
    }
    return exportaciones
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
    });
    if (!exportacion) {
      throw new NotFoundException('Exportacion no encontrada');
    }

    Object.assign(exportacion, updateExportacioneDto);

    if (updateExportacioneDto.idMesProceso) {
      const mesProceso = await this.mesProcesoRepository.findOne({
        where: { idMesProceso: updateExportacioneDto.idMesProceso },
      });

      if (!mesProceso) {
        throw new NotFoundException('Mes Proceso no encontrado');
      }
      exportacion.mesProceso = mesProceso;
    }



    if (updateExportacioneDto.idEnergetico) {
      const Energetico = this.energeticoRepository.findOne({
        where: { idEnergetico: updateExportacioneDto.idEnergetico },
      });

      if (!Energetico) {
        throw new NotFoundException('Energetico no encontrado');
      }
    }
    if (updateExportacioneDto.idUnidad) {
      const Unidad = this.unidadRepository.findOne({
        where: { idUnidad: updateExportacioneDto.idUnidad },
      });
      if (!Unidad) {
        throw new NotFoundException('Unidad no encontrada');
      }
    }
    if (updateExportacioneDto.idPais) {
      const Pais = this.paisRepository.findOne({
        where: { idPais: updateExportacioneDto.idPais },
      });
      if (!Pais) {
        throw new NotFoundException('Pais no encontrado');
      }
    }


    return this.exportacionRepository.save(exportacion);
  }

  remove(id: number) {
    return `This action removes a #${id} exportacione`;
  }
}
