import { Injectable, NotFoundException } from '@nestjs/common';
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

  findOne(id: number) {
    return `This action returns a #${id} mesProceso`;
  }

  update(id: number, updateMesProcesoDto: UpdateMesProcesoDto) {
    return `This action updates a #${id} mesProceso`;
  }

  remove(id: number) {
    return `This action removes a #${id} mesProceso`;
  }
}
