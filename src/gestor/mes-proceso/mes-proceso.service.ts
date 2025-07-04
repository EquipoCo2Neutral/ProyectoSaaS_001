import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateMesProcesoDto } from './dto/create-mes-proceso.dto';
import { UpdateMesProcesoDto } from './dto/update-mes-proceso.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { MesProceso } from './entities/mes-proceso.entity';
import { In, Repository } from 'typeorm';
import { Proceso } from '../proceso/entities/proceso.entity';
import { Mese } from 'src/complementos/meses/entities/mese.entity';

@Injectable()
export class MesProcesoService {
  constructor(
    @InjectRepository(MesProceso)
    private readonly mesProcesoRepository: Repository<MesProceso>,

    @InjectRepository(Proceso)
    private readonly procesoRepository: Repository<Proceso>,

    @InjectRepository(Mese)
    private readonly mesRepository: Repository<Mese>,
  ) {}
  async create(createMesProcesoDto: CreateMesProcesoDto): Promise<MesProceso> {
    const { idMes, idProceso, estado } = createMesProcesoDto;

    const proceso = await this.procesoRepository.findOne({
      where: { idProceso },
    });

    if (!proceso) throw new NotFoundException('Proceso no encontrado');

    const mes = await this.mesRepository.findOne({
      where: { idMes },
    });

    if (!mes) throw new NotFoundException('Mes no encontrado');

    const mesProceso = this.mesProcesoRepository.create({
      mes,
      proceso,
      estado,
    });

    return this.mesProcesoRepository.save(mesProceso);
  }

  findAll() {
    return `This action returns all mesProceso`;
  }

  async findAllByProcesoId(idProceso: string): Promise<MesProceso[]> {
    return this.mesProcesoRepository.find({
      where: { proceso: { idProceso } },
      relations: ['mes', 'proceso', 'proceso.planta'],
    });
  }

  async eliminarMensuales(idProceso: string): Promise<void> {
    await this.mesProcesoRepository.delete({
      proceso: { idProceso },
      mes: { idMes: In([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]) },
    });
  }

  async eliminarRegistroAnual(idProceso: string): Promise<void> {
    await this.mesProcesoRepository.delete({
      proceso: { idProceso },
      mes: { idMes: In([13]) },
    });
  }

  async findOne(id: string, inquilinoId: string) {
    const mesProceso = await this.mesProcesoRepository.findOne({
      where: {
        idMesProceso: id,
        proceso: {
          planta: {
            inquilino: { inquilinoId: inquilinoId },
          },
        },
      },
      relations: [
        'proceso',
        'mes',
        'proceso.planta',
        'proceso.planta.inquilino',
      ],
    });

    if (!mesProceso) {
      throw new NotFoundException('MesProceso no encontrado');
    }

    if (mesProceso.proceso.planta.inquilino.inquilinoId !== inquilinoId) {
      throw new ForbiddenException('No tienes acceso a este recurso');
    }

    return mesProceso;
  }

  async cambiarEstado(id: string) {
    const mesProceso = await this.mesProcesoRepository.findOne({
      where: { idMesProceso: id },
    });

    if (!mesProceso) {
      throw new NotFoundException(`No existe el MesProceso con id ${id}`);
    }

    // invertir estado
    mesProceso.estado = !mesProceso.estado;

    return await this.mesProcesoRepository.save(mesProceso);
  }

  update(id: number, updateMesProcesoDto: UpdateMesProcesoDto) {
    return `This action updates a #${id} mesProceso`;
  }

  remove(id: number) {
    return `This action removes a #${id} mesProceso`;
  }
}
