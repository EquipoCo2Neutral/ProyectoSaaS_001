import { MesProceso } from 'src/gestor/mes-proceso/entities/mes-proceso.entity';
import {
  Column,
  Entity,
  ManyToOne,
  PrimaryColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class UsosFinale {
  @PrimaryGeneratedColumn('increment')
  idUsoFinal: number;

  @Column()
  idEnergetico: number;

  @Column()
  idCategoriaUF: number;

  @Column({ nullable: true })
  idTipoUF: number;

  @Column()
  idUnidad: number;

  @Column()
  cantidad: number;

  @Column({ nullable: true })
  tipo: string;

  @Column({ nullable: true })
  detalle: string;

  @ManyToOne(() => MesProceso, (mesProceso) => mesProceso.usoFinal, {
    nullable: false,
  })
  mesProceso: MesProceso;
}
