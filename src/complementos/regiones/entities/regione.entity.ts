import { Comuna } from 'src/complementos/comunas/entities/comuna.entity';
import { Pais } from 'src/complementos/paises/entities/paise.entity';
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';

@Entity('regiones')
@Unique(['nombre'])
export class Regiones {
  @PrimaryGeneratedColumn('increment')
  idRegion: number;

  @Column()
  nombre: string;

  @ManyToOne(() => Pais)
  pais: Pais;

  @OneToMany(() => Comuna, (comuna) => comuna.region)
  comunas: Comuna[];
}
