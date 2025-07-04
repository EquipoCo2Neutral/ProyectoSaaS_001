import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
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
import { conversorTcal } from 'src/utilties/conversor';
import { ResumenTransaccionService } from '../resumen-transaccion/resumen-transaccion.service';

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
    private readonly resumenTransaccionService: ResumenTransaccionService,
  ) {}

  async create(createVentaElectricidadDto: CreateVentaElectricidadDto) {
    //validar mes proceso
    const mesProceso = await this.mesProcesoRepository.findOne({
      where: { idMesProceso: createVentaElectricidadDto.idMesProceso },
      relations: ['proceso', 'proceso.planta', 'proceso.planta.inquilino'],
    });

    //extraer tcal y unidadGeneral
    const ejemploDatos = {
      idEnergetico: 43,
      idUnidad: createVentaElectricidadDto.idUnidad,
      cantidad: createVentaElectricidadDto.cantidadVendida,
      poderCalorifico: null,
      humedad: null,
    };

    const resultado2 = await conversorTcal(ejemploDatos);

    if (!resultado2) {
      throw new BadRequestException('No se pudo calcular la conversión a Tcal');
    }

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

    const resumenTransaccion = await this.resumenTransaccionService.createRT({
      idEnergetico: 43,
      idCategoriaRegistro: createVentaElectricidadDto.idDestinoVenta + 15, // Si aplica
      cantidadEntrada: 0,
      cantidadSalida: createVentaElectricidadDto.cantidadVendida,
      idUnidad: resultado2.unidadGeneral,
      idUnidadOriginal: createVentaElectricidadDto.idUnidad,
      idMesProceso: createVentaElectricidadDto.idMesProceso,
      idProceso: mesProceso.proceso.idProceso,
      idPlanta: mesProceso.proceso.planta.idPlanta,
      inquilinoId: mesProceso.proceso.planta.inquilino.inquilinoId,
      cantidadGeneral: resultado2.cantidadGeneral,
      teraCalorias: resultado2.cantidadTcal,
    });

    const ventaElectricidad = this.ventaElectricidadRepository.create({
      resumenTransaccion: resumenTransaccion,
      idDestinoVenta: createVentaElectricidadDto.idDestinoVenta,
      ventaMercadoSpot: createVentaElectricidadDto.ventaMercadoSpot,
      cantidadVendida: createVentaElectricidadDto.cantidadVendida,
      empresaDestino: createVentaElectricidadDto.empresaDestino,
      mesProceso,
      unidad: { idUnidad: createVentaElectricidadDto.idUnidad } as Unidade,
    });
    if (createVentaElectricidadDto.idRegion) {
      ventaElectricidad.region = {
        idRegion: createVentaElectricidadDto.idRegion,
      } as Regiones;
    }

    if (createVentaElectricidadDto.idSectorEconomico) {
      ventaElectricidad.sectorE = {
        idSector: createVentaElectricidadDto.idSectorEconomico,
      } as SectorEconomico;
    }

    if (createVentaElectricidadDto.idSubSectorEconomico) {
      ventaElectricidad.subSectorE = {
        idSubSector: createVentaElectricidadDto.idSubSectorEconomico,
      } as SubSectorEconomico;
    }

    const resultado =
      await this.ventaElectricidadRepository.save(ventaElectricidad);
    return {
      message: `Venta electricidad registrada correctamente ${resultado2.cantidadGeneral}and ${resultado2.cantidadTcal}`,
      data: resultado,
    };
  }

  async findAll(id: string): Promise<VentaElectricidad[]> {
    const ventaElectricidad = await this.ventaElectricidadRepository.find({
      where: { mesProceso: { idMesProceso: id } },
      relations: ['mesProceso', 'unidad', 'region', 'sectorE', 'subSectorE'],
    });
    if (!ventaElectricidad) {
      throw new NotFoundException('Venta de electricidad no encontrada');
    }
    return ventaElectricidad;
  }

  async findOne(id: number, inquilinoId: string) {
    const ventaElectricidad = await this.ventaElectricidadRepository.findOne({
      where: {
        idVentaElectricidad: id,
        mesProceso: {
          proceso: {
            planta: {
              inquilino: { inquilinoId: inquilinoId },
            },
          },
        },
      },
      relations: {
        mesProceso: true,
        unidad: true,
        region: true,
        sectorE: true,
        subSectorE: true,
      },
    });
    if (!ventaElectricidad) {
      throw new NotFoundException(
        `Venta de electricidad con ID ${id} no encontrada o no pertenece al inquilinos`,
      );
    }
    return ventaElectricidad;
  }

  async update(
    id: number,
    updateVentaElectricidadDto: UpdateVentaElectricidadDto,
  ) {
    const ventaElectricidad = await this.ventaElectricidadRepository.findOne({
      where: { idVentaElectricidad: id },
      relations: [
        'unidad',
        'mesProceso',
        'mesProceso.proceso',
        'mesProceso.proceso.planta',
        'mesProceso.proceso.planta.inquilino',
        'region',
        'sectorE',
        'subSectorE',
        'resumenTransaccion',
      ],
    });
    if (!ventaElectricidad) {
      throw new NotFoundException('Venta de electricidad no encontrada');
    }

    Object.assign(ventaElectricidad, updateVentaElectricidadDto);

    if (updateVentaElectricidadDto.idMesProceso) {
      const mesProceso = await this.mesProcesoRepository.findOne({
        where: { idMesProceso: updateVentaElectricidadDto.idMesProceso },
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
      ventaElectricidad.mesProceso = mesProceso;
    }

    if (updateVentaElectricidadDto.idUnidad) {
      const unidad = await this.unidadRepository.findOneBy({
        idUnidad: updateVentaElectricidadDto.idUnidad,
      });
      if (!unidad) {
        throw new NotFoundException('Unidad no encontrada');
      }
      ventaElectricidad.unidad = unidad;
    }

    // REGION
    if (updateVentaElectricidadDto.idRegion === null) {
      ventaElectricidad.region = null;
    } else if (updateVentaElectricidadDto.idRegion !== undefined) {
      const region = await this.regionesRepository.findOneBy({
        idRegion: updateVentaElectricidadDto.idRegion,
      });
      if (!region) {
        throw new NotFoundException('Region no encontrada');
      }
      ventaElectricidad.region = region;
    }

    // SECTOR
    if (updateVentaElectricidadDto.idSectorEconomico === null) {
      ventaElectricidad.sectorE = null;
    } else if (updateVentaElectricidadDto.idSectorEconomico !== undefined) {
      const sector = await this.sectorRepository.findOneBy({
        idSector: updateVentaElectricidadDto.idSectorEconomico,
      });
      if (!sector) {
        throw new NotFoundException('Sector no encontrado');
      }
      ventaElectricidad.sectorE = sector;
    }

    // SUBSECTOR
    if (updateVentaElectricidadDto.idSubSectorEconomico === null) {
      ventaElectricidad.subSectorE = null;
    } else if (updateVentaElectricidadDto.idSubSectorEconomico !== undefined) {
      const subSector = await this.subSectorRepository.findOneBy({
        idSubSector: updateVentaElectricidadDto.idSubSectorEconomico,
      });
      if (!subSector) {
        throw new NotFoundException('Subsector no encontrado');
      }
      ventaElectricidad.subSectorE = subSector;
    }
    // proceso resumen
    //extraer tcal y unidadGeneral
    const ejemploDatos = {
      idEnergetico: 43,
      idUnidad:
        updateVentaElectricidadDto.idUnidad ??
        ventaElectricidad.unidad.idUnidad ??
        0,
      cantidad:
        updateVentaElectricidadDto.cantidadVendida ??
        ventaElectricidad.cantidadVendida ??
        0,
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
      ventaElectricidad.resumenTransaccion.idResumenTransaccion,
      {
        idEnergetico: 43,
        idCategoriaRegistro: updateVentaElectricidadDto.idDestinoVenta
          ? updateVentaElectricidadDto.idDestinoVenta + 15
          : ventaElectricidad.idDestinoVenta, // Si aplica
        cantidadEntrada: 0,
        cantidadSalida: updateVentaElectricidadDto.cantidadVendida
          ? updateVentaElectricidadDto.cantidadVendida
          : ventaElectricidad.cantidadVendida,
        idUnidad: resultado2.unidadGeneral,
        idUnidadOriginal: updateVentaElectricidadDto.idUnidad
          ? updateVentaElectricidadDto.idUnidad
          : ventaElectricidad.unidad.idUnidad,
        idMesProceso: updateVentaElectricidadDto.idMesProceso
          ? updateVentaElectricidadDto.idMesProceso
          : ventaElectricidad.mesProceso.idMesProceso,
        idProceso: ventaElectricidad.mesProceso.proceso.idProceso, // Asegúrate de que viene en el DTO
        idPlanta: ventaElectricidad.mesProceso.proceso.planta.idPlanta, // Asegúrate de que viene en el DTO
        inquilinoId:
          ventaElectricidad.mesProceso.proceso.planta.inquilino.inquilinoId, // Asegúrate de que viene en el DTO
        cantidadGeneral: resultado2.cantidadGeneral,
        teraCalorias: resultado2.cantidadTcal,
      },
    );

    const resultado =
      await this.ventaElectricidadRepository.save(ventaElectricidad);
    return {
      resultado,
      message: 'Venta de electricidad actualizada correctamente',
    };
  }

  async remove(id: number) {
    const venta = await this.ventaElectricidadRepository.findOne({
      where: { idVentaElectricidad: id },
      relations: ['resumenTransaccion'],
    });

    if (!venta) {
      throw new NotFoundException('Venta de Electricidad no encontrada');
    }

    // Elimina primero la venta
    await this.ventaElectricidadRepository.delete(id);

    // Luego elimina el resumen si existe
    if (venta.resumenTransaccion) {
      await this.resumenTransaccionService.removeRT(
        venta.resumenTransaccion.idResumenTransaccion,
      );
    }

    return {
      message: 'Venta de Electricidad y resumen borrados correctamente',
    };
  }
}
