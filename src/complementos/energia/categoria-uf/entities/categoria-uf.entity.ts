import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { TipoUf } from '../../tipo-uf/entities/tipo-uf.entity';
import { UsosFinale } from 'src/registro/usos-finales/entities/usos-finale.entity';

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

  @OneToMany(() => UsosFinale, (usoFinal) => usoFinal.categoriaUF, {
    cascade: true,
  })
  usoFinal: UsosFinale[];
}
