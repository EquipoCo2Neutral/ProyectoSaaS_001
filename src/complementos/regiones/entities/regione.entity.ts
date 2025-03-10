import { Pais } from 'src/complementos/paises/entities/paise.entity';
import {
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';

@Entity('regiones')
@Unique(['nombre'])
export class Regiones {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  nombre: string;

  @ManyToOne(() => Pais)
  pais: Pais;
}
