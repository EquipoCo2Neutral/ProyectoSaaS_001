import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateVentaElectricidadDto } from './dto/create-venta-electricidad.dto';
import { UpdateVentaElectricidadDto } from './dto/update-venta-electricidad.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { VentaElectricidad } from './entities/venta-electricidad.entity';
import { Repository } from 'typeorm';
import { MesProceso } from 'src/gestor/mes-proceso/entities/mes-proceso.entity';
import { SectorEconomico } from 'src/complementos/energia/sector-economico/entities/sector-economico.entity';
import { SubSectorEconomico } from 'src/complementos/energia/sub-sector-economico/entities/sub-sector-economico.entity';
import { Unidade } from 'src/complementos/energia/unidades/entities/unidade.entity';
import { Regiones } from 'src/complementos/regiones/entities/regione.entity';

@Injectable()
export class VentaElectricidadService {
  constructor(
    @InjectRepository(VentaElectricidad)
    private readonly ventaElectricidadRepository: Repository<VentaElectricidad>,
    @InjectRepository(MesProceso)
    private readonly mesProcesoRepository: Repository<MesProceso>,
    @InjectRepository(SectorEconomico)
    private readonly sectorRepository: Repository<SectorEconomico>,
    @InjectRepository(Regiones)
    private readonly regionesRepository: Repository<Regiones>,
    @InjectRepository(SubSectorEconomico)
    private readonly subSectorRepository: Repository<SubSectorEconomico>,
    @InjectRepository(Unidade)
    private readonly unidadRepository: Repository<Unidade>,
  ) {}

  async create(createVentaElectricidadDto: CreateVentaElectricidadDto) {
    //validar mes proceso
    const mesProceso = await this.mesProcesoRepository.findOneBy({
      idMesProceso: createVentaElectricidadDto.idMesProceso,
    });
    if (!mesProceso) {
      throw new NotFoundException('Mes proceso no encontrado');
    }

    //validar la unidad
    if (createVentaElectricidadDto.idUnidad) {
      const unidad = await this.unidadRepository.findOneBy({
        idUnidad: createVentaElectricidadDto.idUnidad,
      });

      if (!unidad) {
        throw new NotFoundException('Unidad Invalida');
      }
    }

    //validar la region

    if (createVentaElectricidadDto.idRegion) {
      const region = await this.regionesRepository.findOneBy({
        idRegion: createVentaElectricidadDto.idRegion,
      });
      if (!region) {
        throw new NotFoundException('Region Invalida');
      }
    }

    //validar el sector

    if (createVentaElectricidadDto.idSectorEconomico) {
      const sector = await this.sectorRepository.findOneBy({
        idSector: createVentaElectricidadDto.idSectorEconomico,
      });
      if (!sector) {
        throw new NotFoundException('Sector Invalido');
      }
    }

    //validar el sub-sector

    if (createVentaElectricidadDto.idSubSectorEconomico) {
      const subSector = await this.subSectorRepository.findOneBy({
        idSubSector: createVentaElectricidadDto.idSubSectorEconomico,
      });

      if (!subSector) {
        throw new NotFoundException('SubSector Invalido');
      }
    }

    const ventaElectricidad = await this.ventaElectricidadRepository.save({
      ...createVentaElectricidadDto,
      mesProceso,
      message: 'Venta registrada correctamente',
    });

    return ventaElectricidad;
  }

  findAll() {
    return `This action returns all ventaElectricidad`;
  }

  findOne(id: number) {
    return `This action returns a #${id} ventaElectricidad`;
  }

  update(id: number, updateVentaElectricidadDto: UpdateVentaElectricidadDto) {
    return `This action updates a #${id} ventaElectricidad`;
  }

  remove(id: number) {
    return `This action removes a #${id} ventaElectricidad`;
  }
}
