import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
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
import { ResumenTransaccionService } from '../resumen-transaccion/resumen-transaccion.service';
import { conversorTcal } from 'src/utilties/conversor';

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
    private readonly resumenTransaccionService: ResumenTransaccionService,
  ) {}

  async create(createVentaEnergeticoDto: CreateVentaEnergeticoDto) {
    //validar mes proceso
    const mesProceso = await this.mesProcesoRepository.findOne({
      where: { idMesProceso: createVentaEnergeticoDto.idMesProceso },
      relations: ['proceso', 'proceso.planta', 'proceso.planta.inquilino'],
    });

    if (!mesProceso) {
      throw new NotFoundException('Mes proceso no encontrado');
    }

    //extraer tcal y unidadGeneral
    const ejemploDatos = {
      idEnergetico: createVentaEnergeticoDto.idEnergetico,
      idUnidad: createVentaEnergeticoDto.idUnidad,
      cantidad: createVentaEnergeticoDto.cantidad,
      poderCalorifico: null,
      humedad: null,
    };

    const resultado2 = await conversorTcal(ejemploDatos);

    if (!resultado2) {
      throw new BadRequestException('No se pudo calcular la conversión a Tcal');
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

    const resumenTransaccion = await this.resumenTransaccionService.createRT({
      idEnergetico: createVentaEnergeticoDto.idEnergetico,
      idCategoriaRegistro: 20, // Si aplica
      cantidadEntrada: 0,
      cantidadSalida: createVentaEnergeticoDto.cantidad,
      idUnidad: createVentaEnergeticoDto.idUnidad,
      idMesProceso: createVentaEnergeticoDto.idMesProceso,
      idProceso: mesProceso.proceso.idProceso, // Asegúrate de que viene en el DTO
      idPlanta: mesProceso.proceso.planta.idPlanta, // Asegúrate de que viene en el DTO
      inquilinoId: mesProceso.proceso.planta.inquilino.inquilinoId, // Asegúrate de que viene en el DTO
      cantidadGeneral: resultado2.cantidadGeneral,
      teraCalorias: resultado2.cantidadTcal,
    });

    const ventaEnergetico = this.ventaEnergetico.create({
      resumenTransaccion: resumenTransaccion,
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
    const ventaEnergetico = await this.ventaEnergetico.find({
      where: { mesProceso: { idMesProceso: id } },
      relations: [
        'mesProceso',
        'unidad',
        'sector',
        'subSector',
        'region',
        'energetico',
      ],
    });
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
      relations: [
        'mesProceso',
        'mesProceso.proceso',
        'mesProceso.proceso.planta',
        'mesProceso.proceso.planta.inquilino',
        'unidad',
        'sector',
        'subSector',
        'region',
        'energetico',
        'resumenTransaccion',
      ],
    });
    if (!ventaEnergetico) {
      throw new NotFoundException('Venta energetico no encontrado');
    }
    // Asignar los cambios del DTO
    Object.assign(ventaEnergetico, updateVentaEnergeticoDto);

    if (updateVentaEnergeticoDto.idMesProceso) {
      const mesProceso = await this.mesProcesoRepository.findOne({
        where: { idMesProceso: updateVentaEnergeticoDto.idMesProceso },
        relations: [
          'proceso',
          'proceso.planta',
          'proceso.planta.inquilino',
          'resumenTransaccion',
        ],
      });
      if (!mesProceso) {
        throw new NotFoundException('Mes proceso no encontrado');
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
      ventaEnergetico.mesProceso = mesProceso;
    }

    if (updateVentaEnergeticoDto.idEnergetico) {
      const energetico = await this.energeticoRepository.findOneBy({
        idEnergetico: updateVentaEnergeticoDto.idEnergetico,
      });
      if (!energetico) {
        throw new NotFoundException('energetico invalido');
      }
      ventaEnergetico.energetico = energetico;
    }
    if (updateVentaEnergeticoDto.idUnidad) {
      const unidad = await this.unidadRepository.findOneBy({
        idUnidad: updateVentaEnergeticoDto.idUnidad,
      });
      if (!unidad) {
        throw new NotFoundException('unidad invalida');
      }
      ventaEnergetico.unidad = unidad;
    }

    if (updateVentaEnergeticoDto.idRegion) {
      const region = await this.regionesRepository.findOneBy({
        idRegion: updateVentaEnergeticoDto.idRegion,
      });
      if (!region) {
        throw new NotFoundException('region invalida');
      }
      ventaEnergetico.region = region;
    }

    if (updateVentaEnergeticoDto.idSector) {
      const sector = await this.sectorRepository.findOneBy({
        idSector: updateVentaEnergeticoDto.idSector,
      });
      if (!sector) {
        throw new NotFoundException('sector invalido');
      }
      ventaEnergetico.sector = sector;
    }

    if (updateVentaEnergeticoDto.idSubSector) {
      const subSector = await this.subSectorRepository.findOneBy({
        idSubSector: updateVentaEnergeticoDto.idSubSector,
      });
      if (!subSector) {
        throw new NotFoundException('Sub Sector invalido');
      }
      ventaEnergetico.subSector = subSector;
    }

    // proceso resumen
    //extraer tcal y unidadGeneral
    const ejemploDatos = {
      idEnergetico:
        updateVentaEnergeticoDto.idEnergetico ??
        ventaEnergetico.energetico.idEnergetico ??
        0,
      idUnidad:
        updateVentaEnergeticoDto.idUnidad ??
        ventaEnergetico.unidad.idUnidad ??
        0,
      cantidad:
        updateVentaEnergeticoDto.cantidad ?? ventaEnergetico.cantidad ?? 0,
      poderCalorifico: null,
      humedad: null,
    };
    // realizar conversion a Tcal
    const resultado2 = await conversorTcal(ejemploDatos);
    if (!resultado2) {
      throw new BadRequestException('No se pudo calcular la conversión a Tcal');
    }

    if (!ventaEnergetico.resumenTransaccion) {
      throw new NotFoundException('Resumen de transacción no encontrado');
    }
    // asignar valores
    await this.resumenTransaccionService.updateRT(
      ventaEnergetico.resumenTransaccion.idResumenTransaccion,
      {
        idEnergetico: updateVentaEnergeticoDto.idEnergetico
          ? updateVentaEnergeticoDto.idEnergetico
          : ventaEnergetico.energetico.idEnergetico,
        idCategoriaRegistro: 20, // Si aplica
        cantidadEntrada: 0,
        cantidadSalida: updateVentaEnergeticoDto.cantidad
          ? updateVentaEnergeticoDto.cantidad
          : ventaEnergetico.cantidad,
        idUnidad: updateVentaEnergeticoDto.idUnidad
          ? updateVentaEnergeticoDto.idUnidad
          : ventaEnergetico.unidad.idUnidad,
        idMesProceso: updateVentaEnergeticoDto.idMesProceso
          ? updateVentaEnergeticoDto.idMesProceso
          : ventaEnergetico.mesProceso.idMesProceso,
        idProceso: ventaEnergetico.mesProceso.proceso.idProceso, // Asegúrate de que viene en el DTO
        idPlanta: ventaEnergetico.mesProceso.proceso.planta.idPlanta, // Asegúrate de que viene en el DTO
        inquilinoId:
          ventaEnergetico.mesProceso.proceso.planta.inquilino.inquilinoId, // Asegúrate de que viene en el DTO
        cantidadGeneral: resultado2.cantidadGeneral,
        teraCalorias: resultado2.cantidadTcal,
      },
    );

    const respuesta = await this.ventaEnergetico.save(ventaEnergetico);
    return {
      respuesta,
      message: 'Venta Energetico actualizada correctamente',
    };
  }

  async remove(id: number) {
    const venta = await this.ventaEnergetico.findOne({
      where: { idVentaEnergetico: id },
      relations: ['resumenTransaccion'],
    });

    if (!venta) {
      throw new NotFoundException('Venta de Energético no encontrada');
    }

    // Primero elimina la venta
    await this.ventaEnergetico.delete(id);

    // Luego elimina el resumen, si existe
    if (venta.resumenTransaccion) {
      await this.resumenTransaccionService.removeRT(
        venta.resumenTransaccion.idResumenTransaccion,
      );
    }

    return {
      message: 'Venta de Energético y resumen borrados correctamente',
    };
  }
}
