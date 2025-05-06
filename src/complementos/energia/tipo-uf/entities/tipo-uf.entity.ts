import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { CategoriaUf } from '../../categoria-uf/entities/categoria-uf.entity';

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
}
