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

    const ventaEnergetico = await this.ventaEnergetico.save({
      ...CreateVentaEnergeticoDto,
      mesProceso,
      message: 'Venta Energetico registrada correctamente',
    });

    if (!ventaEnergetico) {
      throw new NotFoundException('Error al ingresar venta energetico');
    }

    return ventaEnergetico;
  }

  findAll() {
    return `This action returns all ventaEnergetico`;
  }

  findOne(id: number) {
    return `This action returns a #${id} ventaEnergetico`;
  }

  update(id: number, updateVentaEnergeticoDto: UpdateVentaEnergeticoDto) {
    return `This action updates a #${id} ventaEnergetico`;
  }

  remove(id: number) {
    return `This action removes a #${id} ventaEnergetico`;
  }
}
