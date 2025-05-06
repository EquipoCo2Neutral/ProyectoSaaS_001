import { MesProceso } from 'src/gestor/mes-proceso/entities/mes-proceso.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Transformacione {
  @PrimaryGeneratedColumn('increment')
  idTransformacion: number;

  @Column({ nullable: false })
  idEnergetico: number;

  @Column({ nullable: false })
  cantidad: number;

  @Column({ nullable: false })
  idUnidad: number;

  @Column({ nullable: false })
  idEnergeticoProducido: number;

  @ManyToOne(() => MesProceso, (mesProceso) => mesProceso.transformacion, {
    nullable: false,
  })
  mesProceso: MesProceso;
}
