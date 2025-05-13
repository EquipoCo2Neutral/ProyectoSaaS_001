import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUsosFinaleDto } from './dto/create-usos-finale.dto';
import { UpdateUsosFinaleDto } from './dto/update-usos-finale.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { UsosFinale } from './entities/usos-finale.entity';
import { Repository } from 'typeorm';
import { MesProceso } from 'src/gestor/mes-proceso/entities/mes-proceso.entity';
import { Energetico } from 'src/complementos/energia/energeticos/entities/energetico.entity';
import { CategoriaUf } from 'src/complementos/energia/categoria-uf/entities/categoria-uf.entity';
import { TipoUf } from 'src/complementos/energia/tipo-uf/entities/tipo-uf.entity';
import { Unidade } from 'src/complementos/energia/unidades/entities/unidade.entity';

@Injectable()
export class UsosFinalesService {
  constructor(
    @InjectRepository(UsosFinale)
    private readonly usoFinaleRepository: Repository<UsosFinale>,
    @InjectRepository(MesProceso)
    private readonly mesProcesoRepository: Repository<MesProceso>,
    @InjectRepository(Energetico)
    private readonly energeticoRepository: Repository<Energetico>,
    @InjectRepository(CategoriaUf)
    private readonly categoriaUfRepository: Repository<CategoriaUf>,
    @InjectRepository(TipoUf)
    private readonly tipoUfRepository: Repository<TipoUf>,
    @InjectRepository(Unidade)
    private readonly unidadeRepository: Repository<Unidade>,
  ) {}

  async create(createUsosFinaleDto: CreateUsosFinaleDto) {
    //validar mes proceso
    const mesProceso = await this.mesProcesoRepository.findOneBy({
      idMesProceso: createUsosFinaleDto.idMesProceso,
    });
    if (!mesProceso) {
      throw new NotFoundException('Mes proceso no encontrado');
    }
    //validar energético
    if (createUsosFinaleDto.idEnergetico) {
      const energetico = await this.energeticoRepository.findOneBy({
        idEnergetico: createUsosFinaleDto.idEnergetico,
      });
      if (!energetico) {
        throw new NotFoundException('Energético invalido');
      }
    }

    //validar categoría uso final

    if (createUsosFinaleDto.idCategoriaUF) {
      const categoriaUf = await this.categoriaUfRepository.findOneBy({
        idCategoriaUF: createUsosFinaleDto.idCategoriaUF,
      });

      if (!categoriaUf) {
        throw new NotFoundException('Categoria Invalida');
      }
    }

    //validar tipo uso final
    if (createUsosFinaleDto.idTipoUF) {
      const tipoUf = await this.tipoUfRepository.findOneBy({
        idTipoUF: createUsosFinaleDto.idTipoUF,
      });

      if (!tipoUf) {
        throw new NotFoundException('Tipo invalido');
      }
    }

    //validar unidad

    if (createUsosFinaleDto.idUnidad) {
      const unidad = await this.unidadeRepository.findOneBy({
        idUnidad: createUsosFinaleDto.idUnidad,
      });

      if (!unidad) {
        throw new NotFoundException('Unidad Invalida');
      }
    }

    //guardar en db

    const usoFinal = this.usoFinaleRepository.create({
      cantidad: createUsosFinaleDto.cantidad,
      detalle: createUsosFinaleDto.detalle,
      tipo: createUsosFinaleDto.tipo,
      mesProceso,
      energetico: {
        idEnergetico: createUsosFinaleDto.idEnergetico,
      } as Energetico,
      categoriaUF: {
        idCategoriaUF: createUsosFinaleDto.idCategoriaUF,
      } as CategoriaUf,
      unidad: { idUnidad: createUsosFinaleDto.idUnidad } as Unidade,
    });

    if (createUsosFinaleDto.idTipoUF) {
      usoFinal.tipoUF = {
        idTipoUF: createUsosFinaleDto.idTipoUF,
      } as TipoUf;
    }

    const resultado = await this.usoFinaleRepository.save(usoFinal);
    return {
      message: 'Uso final registrado correctamente',
      data: resultado,
    };
  }

  async findAll(id: string): Promise<UsosFinale[]> {
    const usoFinal = await this.usoFinaleRepository.find({where: {mesProceso: { idMesProceso: id }} ,relations: ['mesProceso', 'energetico', 'categoriaUF', 'tipoUF', 'unidad']});
    if (!usoFinal) {
      throw new NotFoundException('Uso Final no encontrado');
    }
    return usoFinal
  }

  async findOne(id: number) {
    const usoFinal = await this.usoFinaleRepository.findOne({
      where: { idUsoFinal: id },
      relations: { mesProceso: true },
    });
    if (!usoFinal) {
      throw new NotFoundException('Uso Final no encontrado');
    }

    return usoFinal;
  }

  async update(id: number, updateUsosFinaleDto: UpdateUsosFinaleDto) {
    const usoFinal = await this.usoFinaleRepository.findOne({
      where: { idUsoFinal: id },
    });
    if (!usoFinal) {
      throw new NotFoundException('Uso Final no encontrado');
    }
    Object.assign(usoFinal, updateUsosFinaleDto);

    if (updateUsosFinaleDto.idMesProceso) {
      const mesProceso = await this.mesProcesoRepository.findOneBy({
        idMesProceso: updateUsosFinaleDto.idMesProceso,
      });
      if (!mesProceso) {
        throw new NotFoundException('Mes Proceso no encontrado');
      }
      usoFinal.mesProceso = mesProceso;
    }

    if (updateUsosFinaleDto.idEnergetico) {
      const energetico = await this.energeticoRepository.findOneBy({
        idEnergetico: updateUsosFinaleDto.idEnergetico,
      });
      if (!energetico) {
        throw new NotFoundException('Energetico no encontrado');
      }
    }

    if (updateUsosFinaleDto.idCategoriaUF) {
      const categoriaUf = await this.categoriaUfRepository.findOneBy({
        idCategoriaUF: updateUsosFinaleDto.idCategoriaUF,
      });
      if (!categoriaUf) {
        throw new NotFoundException('Categoria no encontrada');
      }
    }

    if (updateUsosFinaleDto.idTipoUF) {
      const tipoUf = await this.tipoUfRepository.findOneBy({
        idTipoUF: updateUsosFinaleDto.idTipoUF,
      });
      if (!tipoUf) {
        throw new NotFoundException('Tipo no encontrado');
      }
    }

    if (updateUsosFinaleDto.idUnidad) {
      const unidad = await this.unidadeRepository.findOneBy({
        idUnidad: updateUsosFinaleDto.idUnidad,
      });
      if (!unidad) {
        throw new NotFoundException('Unidad no encontrada');
      }
    }

    return await this.usoFinaleRepository.save(usoFinal);
  }

  remove(id: number) {
    return `This action removes a #${id} usosFinale`;
  }
}
