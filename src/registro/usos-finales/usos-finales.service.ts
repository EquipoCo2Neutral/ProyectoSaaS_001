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

    const usoFinal = await this.usoFinaleRepository.save({
      ...createUsosFinaleDto,
      mesProceso,
      message: 'Uso Final Registrado Correctamente',
    });

    if (!usoFinal) {
      throw new NotFoundException('Error al registrar el uso final');
    }

    return usoFinal;
  }

  findAll() {
    return `This action returns all usosFinales`;
  }

  findOne(id: number) {
    return `This action returns a #${id} usosFinale`;
  }

  update(id: number, updateUsosFinaleDto: UpdateUsosFinaleDto) {
    return `This action updates a #${id} usosFinale`;
  }

  remove(id: number) {
    return `This action removes a #${id} usosFinale`;
  }
}
