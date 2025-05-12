import { Adquisicione } from 'src/registro/adquisiciones/entities/adquisicione.entity';
import {
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';

@Entity()
@Unique(['nombreTransaccion'])
export class Transaccione {
  @PrimaryGeneratedColumn('increment')
  idTransaccion: number;

  @Column({ type: 'varchar', length: 100 })
  nombreTransaccion: string;

  @OneToMany(() => Adquisicione, (adquisicion) => adquisicion.transaccion, {
    cascade: true,
  })
  adquisicion: Adquisicione[];
}
