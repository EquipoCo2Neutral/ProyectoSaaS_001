import { Regiones } from 'src/complementos/regiones/entities/regione.entity';
import {
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';

@Entity()
@Unique(['nombre'])
export class Pais {
  @PrimaryGeneratedColumn('increment')
  idPais: number;

  @Column({ type: 'varchar', length: 100 })
  nombre: string;

  @OneToMany(() => Regiones, (regiones) => regiones, { cascade: true })
  regiones: Regiones[];
}
