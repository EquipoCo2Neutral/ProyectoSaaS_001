import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateResumenTransaccionDto } from './dto/create-resumen-transaccion.dto';
import { UpdateResumenTransaccionDto } from './dto/update-resumen-transaccion.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ResumenTransaccion } from './entities/resumen-transaccion.entity';
import { Repository } from 'typeorm';
import { Energetico } from 'src/complementos/energia/energeticos/entities/energetico.entity';
import { Unidade } from 'src/complementos/energia/unidades/entities/unidade.entity';
import { MesProceso } from 'src/gestor/mes-proceso/entities/mes-proceso.entity';
import { Inquilino } from 'src/administracion/inquilino/entities/inquilino.entity';
import { Proceso } from 'src/gestor/proceso/entities/proceso.entity';
import { Planta } from 'src/administracion/planta/entities/planta.entity';
import { CategoriaRegistro } from 'src/complementos/energia/categoria-registro/entities/categoria-registro.entity';

@Injectable()
export class ResumenTransaccionService {
  constructor(
    @InjectRepository(ResumenTransaccion)
    private readonly resumenTransaccionRepo: Repository<ResumenTransaccion>,

    @InjectRepository(Energetico)
    private readonly energeticoRepo: Repository<Energetico>,

    @InjectRepository(Unidade)
    private readonly unidadeRepo: Repository<Unidade>,

    @InjectRepository(MesProceso)
    private readonly mesProcesoRepo: Repository<MesProceso>,

    @InjectRepository(Inquilino)
    private readonly inquilinoRepo: Repository<Inquilino>,

    @InjectRepository(Proceso)
    private readonly procesoRepo: Repository<Proceso>,

    @InjectRepository(Planta)
    private readonly plantaRepo: Repository<Planta>,
    @InjectRepository(CategoriaRegistro)
    private readonly cRegistroRepo: Repository<CategoriaRegistro>,
  ) {}

  async createRT(createResumenTransaccionDto: CreateResumenTransaccionDto) {
    const {
      idEnergetico,
      idCategoriaRegistro,
      cantidadEntrada,
      cantidadSalida,
      idUnidad,
      idMesProceso,
      idProceso,
      idPlanta,
      inquilinoId,
      cantidadGeneral,
      teraCalorias,
    } = createResumenTransaccionDto;

    const energetico = await this.energeticoRepo.findOneByOrFail({
      idEnergetico,
    });
    const unidad = await this.unidadeRepo.findOneByOrFail({ idUnidad });
    const categoriaRegistro = await this.cRegistroRepo.findOneByOrFail({
      idCategoriaRegistro,
    });
    const mesProceso = await this.mesProcesoRepo.findOneByOrFail({
      idMesProceso,
    });
    const proceso = await this.procesoRepo.findOneByOrFail({ idProceso });
    const planta = await this.plantaRepo.findOneByOrFail({ idPlanta }); // Solo si existe la relación
    const inquilino = await this.inquilinoRepo.findOneByOrFail({ inquilinoId });

    const nuevaTransaccion = this.resumenTransaccionRepo.create({
      energetico,
      categoriaRegistro,
      cantidadEntrada,
      cantidadSalida,
      unidad,
      mesProceso,
      proceso,
      inquilino,
      cantidadGeneral,
      teraCalorias,
      planta,
    });

    return await this.resumenTransaccionRepo.save(nuevaTransaccion);
  }

  findAll() {
    return `This action returns all resumenTransaccion`;
  }

  findOne(id: number) {
    return `This action returns a #${id} resumenTransaccion`;
  }

  async updateRT(
    id: number,
    updateResumenTransaccionDto: UpdateResumenTransaccionDto,
  ) {
    const {
      idEnergetico,
      idCategoriaRegistro,
      cantidadEntrada,
      cantidadSalida,
      idUnidad,
      idMesProceso,
      idProceso,
      idPlanta,
      inquilinoId,
      cantidadGeneral,
      teraCalorias,
    } = updateResumenTransaccionDto;

    const resumenExistente = await this.resumenTransaccionRepo.findOneByOrFail({
      idResumenTransaccion: id,
    });

    const energetico = await this.energeticoRepo.findOneByOrFail({
      idEnergetico,
    });
    const unidad = await this.unidadeRepo.findOneByOrFail({ idUnidad });
    const categoriaRegistro = await this.cRegistroRepo.findOneByOrFail({
      idCategoriaRegistro,
    });
    const mesProceso = await this.mesProcesoRepo.findOneByOrFail({
      idMesProceso,
    });
    const proceso = await this.procesoRepo.findOneByOrFail({ idProceso });
    const planta = await this.plantaRepo.findOneByOrFail({ idPlanta });
    const inquilino = await this.inquilinoRepo.findOneByOrFail({ inquilinoId });

    const updatedResumen = this.resumenTransaccionRepo.merge(resumenExistente, {
      energetico,
      categoriaRegistro,
      cantidadEntrada,
      cantidadSalida,
      unidad,
      mesProceso,
      proceso,
      planta,
      inquilino,
      cantidadGeneral,
      teraCalorias,
    });

    return await this.resumenTransaccionRepo.save(updatedResumen);
  }

  async removeRT(id: number) {
    return await this.resumenTransaccionRepo.delete(id);
  }




async getEnergeticosAgrupadosTotales(idPlanta: string, idProceso: string) {
  try {
    return this.resumenTransaccionRepo
      .createQueryBuilder('rt')
      .select('e.nombreEnergetico', 'nombreEnergetico')
      .addSelect('u.nombreUnidad', 'unidad')
      .addSelect('SUM(rt.cantidadGeneral)', 'totalCantidadGeneral')
      .innerJoin('rt.energetico', 'e')
      .innerJoin('rt.unidad', 'u')
      // Agregar joins para planta y proceso
      .innerJoin('rt.planta', 'p', 'p.idPlanta = :idPlanta', { idPlanta })
      .innerJoin('rt.proceso', 'pr', 'pr.idProceso = :idProceso', { idProceso })
      // Agrupar por los campos requeridos
      .groupBy('e.nombreEnergetico')
      .addGroupBy('u.nombreUnidad')
      .getRawMany();
  } catch (error) {
    throw new BadRequestException('Error al obtener datos agrupados');
  }
}

async getTeraCalorias(idPlanta: string, idProceso: string) {
  try {
    return this.resumenTransaccionRepo
      .createQueryBuilder('rt')
      .select('SUM(rt.teraCalorias)', 'totalteraCalorias')
      .innerJoin('rt.planta', 'p', 'p.idPlanta = :idPlanta', { idPlanta })
      .innerJoin('rt.proceso', 'pr', 'pr.idProceso = :idProceso', { idProceso })
      // Agregar filtro para cantidadSalida = 0
      .andWhere('rt.cantidadSalida = 0')
      .getRawMany();
  } catch (error) {
    throw new BadRequestException('Error al obtener datos agrupados');
  }
}

async getEnergeticosAgrupadosEntradaSalida(idPlanta: string, idProceso: string) {
  try {
    return this.resumenTransaccionRepo
      .createQueryBuilder('rt')
      .select('e.nombreEnergetico', 'nombreEnergetico')
      .addSelect('u.nombreUnidad', 'unidad')
      .addSelect('SUM(rt.cantidadEntrada)', 'totalCantidadEntrada')
      .addSelect('SUM(rt.cantidadSalida)', 'totalCantidadSalida')
      .innerJoin('rt.energetico', 'e')
      .innerJoin('rt.unidad', 'u')
      // Agregar joins para planta y proceso
      .innerJoin('rt.planta', 'p', 'p.idPlanta = :idPlanta', { idPlanta })
      .innerJoin('rt.proceso', 'pr', 'pr.idProceso = :idProceso', { idProceso })
      // Agrupar por los campos requeridos
      .groupBy('e.nombreEnergetico')
      .addGroupBy('u.nombreUnidad')
      .getRawMany();
  } catch (error) {
    throw new BadRequestException('Error al obtener datos agrupados');
  }
}




async getEnergeticosAgrupadosEntrada(idPlanta: string, idProceso: string) {
  try {
    return this.resumenTransaccionRepo
      .createQueryBuilder('rt')
      .select('e.nombreEnergetico', 'nombreEnergetico')
      .addSelect('u.nombreUnidad', 'unidad')
      .addSelect('SUM(rt.cantidadEntrada)', 'totalCantidadEntrada')
      .innerJoin('rt.energetico', 'e')
      .innerJoin('rt.unidad', 'u')
      // Agregar joins para planta y proceso
      .innerJoin('rt.planta', 'p', 'p.idPlanta = :idPlanta', { idPlanta })
      .innerJoin('rt.proceso', 'pr', 'pr.idProceso = :idProceso', { idProceso })
      // Agrupar por los campos requeridos
      .groupBy('e.nombreEnergetico')
      .addGroupBy('u.nombreUnidad')
      .getRawMany();
  } catch (error) {
    throw new BadRequestException('Error al obtener datos agrupados');
  }
}

async getEnergeticosAgrupadosSalida(idPlanta: string, idProceso: string) {
  try {
    return this.resumenTransaccionRepo
      .createQueryBuilder('rt')
      .select('e.nombreEnergetico', 'nombreEnergetico')
      .addSelect('u.nombreUnidad', 'unidad')
      .addSelect('SUM(rt.cantidadSalida)', 'totalCantidadSalida')
      .innerJoin('rt.energetico', 'e')
      .innerJoin('rt.unidad', 'u')
      // Agregar joins para planta y proceso
      .innerJoin('rt.planta', 'p', 'p.idPlanta = :idPlanta', { idPlanta })
      .innerJoin('rt.proceso', 'pr', 'pr.idProceso = :idProceso', { idProceso })
      // Agrupar por los campos requeridos
      .groupBy('e.nombreEnergetico')
      .addGroupBy('u.nombreUnidad')
      .getRawMany();
  } catch (error) {
    throw new BadRequestException('Error al obtener datos agrupados');
  }
}



}
