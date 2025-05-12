import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { CategoriaUf } from '../../categoria-uf/entities/categoria-uf.entity';
import { UsosFinale } from 'src/registro/usos-finales/entities/usos-finale.entity';

@Entity()
export class TipoUf {
  @PrimaryGeneratedColumn('increment')
  idTipoUF: number;

  @Column()
  nombreTipoUF: string;

  @ManyToOne(() => CategoriaUf, (categoriaUf) => categoriaUf.tipoUF, {
    nullable: false,
  })
  categoriaUF: CategoriaUf;

  @OneToMany(() => UsosFinale, (usoFinal) => usoFinal.tipoUF, {
    cascade: true,
  })
  usoFinal: UsosFinale[];
}
