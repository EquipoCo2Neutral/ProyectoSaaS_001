import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateProcesoDto } from './dto/create-proceso.dto';
import { UpdateProcesoDto } from './dto/update-proceso.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Proceso } from './entities/proceso.entity';
import { Repository } from 'typeorm';
import { Planta } from 'src/administracion/planta/entities/planta.entity';
import { Mese } from 'src/complementos/meses/entities/mese.entity';
import { MesProceso } from '../mes-proceso/entities/mes-proceso.entity';

@Injectable()
export class ProcesoService {
  constructor(
    @InjectRepository(Proceso)
    private readonly procesoRepository: Repository<Proceso>,
    @InjectRepository(Planta)
    private readonly plantaRepository: Repository<Planta>,
    @InjectRepository(Mese) private mesRepository: Repository<Mese>,
    @InjectRepository(MesProceso)
    private mesProcesoRepository: Repository<MesProceso>,
  ) {}

  async create(createProcesoDto: CreateProcesoDto) {
    const planta = await this.plantaRepository.findOneBy({
      idPlanta: createProcesoDto.idPlanta,
    });

    if (!planta) {
      throw new NotFoundException('Planta no encontrada');
    }
    const procesoExistente = await this.procesoRepository.findOne({
      where: {
        planta: { idPlanta: createProcesoDto.idPlanta },
        año_proceso: createProcesoDto.año_proceso,
      },
      relations: ['planta'],
    });

    if (procesoExistente) {
      throw new ConflictException(
        `Ya existe un proceso para la planta en el año ingresado`,
      );
    }

    const proceso = new Proceso();
    proceso.año_proceso = createProcesoDto.año_proceso;
    proceso.estado = createProcesoDto.estado;
    proceso.planta = planta;

    const procesoGuardado = await this.procesoRepository.save(proceso);

    // Crear automáticamente los 12 MesProceso
    const meses = await this.mesRepository.find();

    const mesProcesos = meses.map((mes) =>
      this.mesProcesoRepository.create({
        proceso: procesoGuardado,
        mes,
        estado: false,
      }),
    );

    await this.mesProcesoRepository.save(mesProcesos);

    return {
      procesoGuardado,
      message: 'Proceso creado con éxito',
    };
  }

  async findByPlanta(idPlanta: string): Promise<Proceso[]> {
    const planta = await this.plantaRepository.findOne({
      where: { idPlanta },
    });

    if (!planta) {
      throw new NotFoundException('Planta no encontrada');
    }

    const procesos = await this.procesoRepository.find({
      where: { planta: { idPlanta } },
      relations: ['planta'],
      order: { año_proceso: 'DESC' }, //para ordenar por año
    });

    return procesos;
  }

  findAll() {
    return `This action returns all proceso`;
  }

  findOne(id: number) {
    return `This action returns a #${id} proceso`;
  }

  update(id: number, updateProcesoDto: UpdateProcesoDto) {
    return `This action updates a #${id} proceso`;
  }

  remove(id: number) {
    return `This action removes a #${id} proceso`;
  }
  async habilitarRegistroAnual(id: string): Promise<Proceso> {
    const proceso = await this.procesoRepository.findOne({
      where: { idProceso: id },
    });
    if (!proceso) throw new NotFoundException('Proceso no encontrado');

    proceso.registroAnual = true;
    return this.procesoRepository.save(proceso);
  }

  async updateEstado(idProceso: string, estado: boolean) {
    const proceso = await this.procesoRepository.findOne({
      where: { idProceso },
    });

    if (!proceso) {
      throw new NotFoundException('Proceso no encontrado');
    }

    proceso.estado = estado;
    return await this.procesoRepository.save(proceso);
  }
}
