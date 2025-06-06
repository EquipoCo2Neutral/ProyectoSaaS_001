import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { Planta } from '../../../administracion/planta/entities/planta.entity';
import { MesProceso } from 'src/gestor/mes-proceso/entities/mes-proceso.entity';
import { ResumenTransaccion } from 'src/registro/resumen-transaccion/entities/resumen-transaccion.entity';

@Entity()
export class Proceso {
  @PrimaryGeneratedColumn('uuid')
  idProceso: string;

  @ManyToOne(() => Planta, (planta) => planta.procesos, { nullable: false })
  planta: Planta;

  // proceso.entity.ts
  @OneToMany(() => MesProceso, (mesProceso) => mesProceso.proceso)
  mesesProceso: MesProceso[];

  @Column()
  año_proceso: number;

  @Column()
  estado: boolean;

  @Column({ default: false })
  registroAnual: boolean;

  @OneToMany(
    () => ResumenTransaccion,
    (resumenTransaccion) => resumenTransaccion.proceso,
    {
      cascade: true,
    },
  )
  resumenTransaccion: ResumenTransaccion[];
}
