import { Mese } from 'src/complementos/meses/entities/mese.entity';
import { Proceso } from 'src/gestor/proceso/entities/proceso.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class MesProceso {
  @PrimaryGeneratedColumn('uuid')
  idMesProceso: string;

  @ManyToOne(() => Proceso, (proceso) => proceso.mesesProceso, {
    nullable: false,
  })
  proceso: Proceso;

  // mes-proceso.entity.ts
  @ManyToOne(() => Mese, (mes) => mes.mesesProceso, { nullable: false })
  mes: Mese;

  @Column()
  estado: boolean;
}
