import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateVentaEnergeticoDto } from './dto/create-venta-energetico.dto';
import { UpdateVentaEnergeticoDto } from './dto/update-venta-energetico.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { VentaEnergetico } from './entities/venta-energetico.entity';
import { Not, Repository } from 'typeorm';
import { MesProceso } from 'src/gestor/mes-proceso/entities/mes-proceso.entity';
import { Energetico } from 'src/complementos/energia/energeticos/entities/energetico.entity';
import { Unidade } from 'src/complementos/energia/unidades/entities/unidade.entity';
import { Regiones } from 'src/complementos/regiones/entities/regione.entity';
import { SectorEconomico } from 'src/complementos/energia/sector-economico/entities/sector-economico.entity';
import { SubSectorEconomico } from 'src/complementos/energia/sub-sector-economico/entities/sub-sector-economico.entity';

@Injectable()
export class VentaEnergeticoService {
  constructor(
    @InjectRepository(VentaEnergetico)
    private readonly ventaEnergetico: Repository<VentaEnergetico>,
    @InjectRepository(MesProceso)
    private readonly mesProcesoRepository: Repository<MesProceso>,
    @InjectRepository(Energetico)
    private readonly energeticoRepository: Repository<Energetico>,
    @InjectRepository(Unidade)
    private readonly unidadRepository: Repository<Unidade>,
    @InjectRepository(Regiones)
    private readonly regionesRepository: Repository<Regiones>,
    @InjectRepository(SectorEconomico)
    private readonly sectorRepository: Repository<SectorEconomico>,
    @InjectRepository(SubSectorEconomico)
    private readonly subSectorRepository: Repository<SubSectorEconomico>,
  ) {}

  async create(createVentaEnergeticoDto: CreateVentaEnergeticoDto) {
    //validar mes proceso
    const mesProceso = await this.mesProcesoRepository.findOneBy({
      idMesProceso: createVentaEnergeticoDto.idMesProceso,
    });
    if (!mesProceso) {
      throw new NotFoundException('Mes proceso no encontrado');
    }

    //validar energetico
    if (createVentaEnergeticoDto.idEnergetico) {
      const energetico = await this.energeticoRepository.findOneBy({
        idEnergetico: createVentaEnergeticoDto.idEnergetico,
      });

      if (!energetico) {
        throw new NotFoundException('energetico invalido');
      }
    }
    //validar la unidad
    if (createVentaEnergeticoDto.idUnidad) {
      const unidad = await this.unidadRepository.findOneBy({
        idUnidad: createVentaEnergeticoDto.idUnidad,
      });

      if (!unidad) {
        throw new NotFoundException('unidad invalida');
      }
    }

    //validar la region
    if (createVentaEnergeticoDto.idRegion) {
      const region = await this.regionesRepository.findOneBy({
        idRegion: createVentaEnergeticoDto.idRegion,
      });

      if (!region) {
        throw new NotFoundException('region invalida');
      }
    }
    //validar el sector
    if (createVentaEnergeticoDto.idSector) {
      const sector = await this.sectorRepository.findOneBy({
        idSector: createVentaEnergeticoDto.idSector,
      });

      if (!sector) {
        throw new NotFoundException('sector invalido');
      }
    }
    //validar el sub-sector
    if (createVentaEnergeticoDto.idSubSector) {
      const subSector = await this.subSectorRepository.findOneBy({
        idSubSector: createVentaEnergeticoDto.idSubSector,
      });

      if (!subSector) {
        throw new NotFoundException('Sub Sector invalido');
      }
    }

    const ventaEnergetico = this.ventaEnergetico.create({
      cantidad: createVentaEnergeticoDto.cantidad,
      mesProceso,
      energetico: {
        idEnergetico: createVentaEnergeticoDto.idEnergetico,
      } as Energetico,
      unidad: { idUnidad: createVentaEnergeticoDto.idUnidad } as Unidade,
      region: { idRegion: createVentaEnergeticoDto.idRegion } as Regiones,
      sector: {
        idSector: createVentaEnergeticoDto.idSector,
      } as SectorEconomico,
      subSector: {
        idSubSector: createVentaEnergeticoDto.idSubSector,
      } as SubSectorEconomico,
    });

    const resultado = await this.ventaEnergetico.save(ventaEnergetico);

    return {
      message: 'Venta Energetico registrada correctamente',
      data: resultado,
    };
  }

  async findAll(id: string): Promise<VentaEnergetico[]> {
    const ventaEnergetico = await this.ventaEnergetico.find({where: {mesProceso: { idMesProceso: id }} ,relations: ['mesProceso', 'unidad', 'sector', 'subSector', 'region', 'energetico']});
    if (!ventaEnergetico) {
      throw new NotFoundException('Venta energetico no encontrado');
    }
    return ventaEnergetico;
  }

  async findOne(id: number) {
    const ventaEnergetico = await this.ventaEnergetico.findOne({
      where: { idVentaEnergetico: id },
      relations: {
        mesProceso: true,
        unidad: true,
        sector: true,
        subSector: true,
        region: true,
        energetico: true,
      },
    });
    if (!ventaEnergetico) {
      throw new NotFoundException('Venta energetico no encontrado');
    }

    return ventaEnergetico;
  }

  async update(id: number, updateVentaEnergeticoDto: UpdateVentaEnergeticoDto) {
    const ventaEnergetico = await this.ventaEnergetico.findOne({
      where: { idVentaEnergetico: id },
    });
    if (!ventaEnergetico) {
      throw new NotFoundException('Venta energetico no encontrado');
    }
    Object.assign(ventaEnergetico, updateVentaEnergeticoDto);

    if (updateVentaEnergeticoDto.idMesProceso) {
      const mesProceso = await this.mesProcesoRepository.findOneBy({
        idMesProceso: updateVentaEnergeticoDto.idMesProceso,
      });
      if (!mesProceso) {
        throw new NotFoundException('Mes proceso no encontrado');
      }
      ventaEnergetico.mesProceso = mesProceso;
    }

    if (updateVentaEnergeticoDto.idEnergetico) {
      const energetico = await this.energeticoRepository.findOneBy({
        idEnergetico: updateVentaEnergeticoDto.idEnergetico,
      });
      if (!energetico) {
        throw new NotFoundException('energetico invalido');
      }
    }
    if (updateVentaEnergeticoDto.idUnidad) {
      const unidad = await this.unidadRepository.findOneBy({
        idUnidad: updateVentaEnergeticoDto.idUnidad,
      });
      if (!unidad) {
        throw new NotFoundException('unidad invalida');
      }
    }

    if (updateVentaEnergeticoDto.idRegion) {
      const region = await this.regionesRepository.findOneBy({
        idRegion: updateVentaEnergeticoDto.idRegion,
      });
      if (!region) {
        throw new NotFoundException('region invalida');
      }
    }

    if (updateVentaEnergeticoDto.idSector) {
      const sector = await this.sectorRepository.findOneBy({
        idSector: updateVentaEnergeticoDto.idSector,
      });
      if (!sector) {
        throw new NotFoundException('sector invalido');
      }
    }

    if (updateVentaEnergeticoDto.idSubSector) {
      const subSector = await this.subSectorRepository.findOneBy({
        idSubSector: updateVentaEnergeticoDto.idSubSector,
      });
      if (!subSector) {
        throw new NotFoundException('Sub Sector invalido');
      }
    }

    return await this.ventaEnergetico.save(ventaEnergetico);
  }

  remove(id: number) {
    return `This action removes a #${id} ventaEnergetico`;
  }
}
