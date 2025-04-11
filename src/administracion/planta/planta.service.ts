import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePlantaDto } from './dto/create-planta.dto';
import { UpdatePlantaDto } from './dto/update-planta.dto';
import { Planta } from './entities/planta.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Usuario } from '../usuario/entities/usuario.entity';
import { Inquilino } from '../inquilino/entities/inquilino.entity';
import { Comuna } from 'src/complementos/comunas/entities/comuna.entity';

@Injectable()
export class PlantaService {
  constructor(
    @InjectRepository(Planta)
    private plantaRepository: Repository<Planta>,
    @InjectRepository(Usuario)
    private usuarioRepository: Repository<Usuario>,
    @InjectRepository(Inquilino)
    private inquilinoRepository: Repository<Inquilino>,
    @InjectRepository(Comuna)
    private comunaRepository: Repository<Comuna>,
  ) {}

  async findByInquilino(inquilinoId: string) {
    const plantas = await this.plantaRepository.find({
      where: {
        inquilino: { inquilinoId },
      },
      relations: {
        comuna: true,
        usuario: true,
        inquilino: true,
      },
    });

    return plantas.map((planta) => ({
      idPlanta: planta.idPlanta,
      nombre: planta.nombre,
      direccion: planta.direccion,
      estado: planta.estado,
      usuarioId: planta.usuario.usuarioId,
      inquilinoId: planta.inquilino.inquilinoId,
      comunaId: planta.comuna.idComuna,
    }));
  }

  async create(createPlantaDto: CreatePlantaDto) {
    const usuario = await this.usuarioRepository.findOneBy({
      usuarioId: createPlantaDto.usuarioId,
    });
    const inquilino = await this.inquilinoRepository.findOneBy({
      inquilinoId: createPlantaDto.inquilinoId,
    });
    const comuna = await this.comunaRepository.findOneBy({
      idComuna: createPlantaDto.comunaId,
    });

    if (!usuario) {
      let errors: string[] = [];
      errors.push('El usuario no existe');
      throw new NotFoundException(errors);
    }
    if (!inquilino) {
      let errors: string[] = [];
      errors.push('El inquilino no existe');
      throw new NotFoundException(errors);
    }
    if (!comuna) {
      let errors: string[] = [];
      errors.push('La comuna no existe');
      throw new NotFoundException(errors);
    }

    return this.plantaRepository.save({
      ...createPlantaDto,
      usuario,
      inquilino,
      comuna,
    });
  }

  async findAll() {
    return await this.plantaRepository.find();
  }

  async findOne(id: string) {
    const planta = await this.plantaRepository.findOne({
      where: { idPlanta: id },
      relations: { usuario: true, inquilino: true, comuna: true },
    });

    if (!planta) {
      let errors: string[] = [];
      errors.push('La planta no existe');
      throw new NotFoundException(errors);
    }

    return planta;
  }

  async update(id: string, updatePlantaDto: UpdatePlantaDto) {
    const planta = await this.findOne(id);
    Object.assign(planta, updatePlantaDto);

    if (updatePlantaDto.usuarioId) {
      const usuario = await this.usuarioRepository.findOneBy({
        usuarioId: updatePlantaDto.usuarioId,
      });

      if (!usuario) {
        let errors: string[] = [];
        errors.push('El usuario no existe');
        throw new NotFoundException(errors);
      }

      planta.usuario = usuario;
    }
    if (updatePlantaDto.inquilinoId) {
      const inquilino = await this.inquilinoRepository.findOneBy({
        inquilinoId: updatePlantaDto.inquilinoId,
      });

      if (!inquilino) {
        let errors: string[] = [];
        errors.push('El inquilino no existe');
        throw new NotFoundException(errors);
      }

      planta.inquilino = inquilino;
    }
    if (updatePlantaDto.comunaId) {
      const comuna = await this.comunaRepository.findOneBy({
        idComuna: updatePlantaDto.comunaId,
      });

      if (!comuna) {
        let errors: string[] = [];
        errors.push('La comuna no existe');
        throw new NotFoundException(errors);
      }

      planta.comuna = comuna;
    }

    return await this.plantaRepository.save(planta);
  }

  async remove(id: string) {
    const planta = await this.findOne(id);
    await this.plantaRepository.remove(planta);
    return 'La planta ha sido eliminada';
  }
}
