import { CategoriaUf } from 'src/complementos/energia/categoria-uf/entities/categoria-uf.entity';
import { Energetico } from 'src/complementos/energia/energeticos/entities/energetico.entity';
import { TipoUf } from 'src/complementos/energia/tipo-uf/entities/tipo-uf.entity';
import { Unidade } from 'src/complementos/energia/unidades/entities/unidade.entity';
import { MesProceso } from 'src/gestor/mes-proceso/entities/mes-proceso.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class UsosFinale {
  @PrimaryGeneratedColumn('increment')
  idUsoFinal: number;
  //columnas
  @Column()
  cantidad: number;

  @Column({ nullable: true })
  tipo: string;

  @Column({ nullable: true })
  detalle: string;
  //relaciones
  @ManyToOne(() => MesProceso, (mesProceso) => mesProceso.usoFinal, {
    nullable: false,
  })
  mesProceso: MesProceso;

  @ManyToOne(() => Energetico, (energetico) => energetico.usoFinal, {
    nullable: false,
  })
  @JoinColumn({ name: 'idEnergetico' })
  energetico: Energetico;

  @ManyToOne(() => CategoriaUf, (categoriaUF) => categoriaUF.usoFinal, {
    nullable: false,
  })
  @JoinColumn({ name: 'idCategoriaUF' })
  categoriaUF: CategoriaUf;

  @ManyToOne(() => TipoUf, (tipoUF) => tipoUF.usoFinal, {
    nullable: true,
  })
  @JoinColumn({ name: 'idTipoUF' })
  tipoUF: TipoUf;

  @ManyToOne(() => Unidade, (unidad) => unidad.usoFinal, { nullable: false })
  @JoinColumn({ name: 'idUnidad' })
  unidad: Unidade;
}
