import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { TipoUf } from '../../tipo-uf/entities/tipo-uf.entity';

@Entity()
export class CategoriaUf {
  @PrimaryGeneratedColumn('increment')
  idCategoriaUF: number;

  @Column()
  nombreCategoria: string;

  @OneToMany(() => TipoUf, (tipoUf) => tipoUf.categoriaUF, {
    cascade: true,
  })
  tipoUF: TipoUf[];
}
