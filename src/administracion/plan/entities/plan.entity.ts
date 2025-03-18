import { Suscripcion } from 'src/administracion/suscripcion/entities/suscripcion.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  Unique,
} from 'typeorm';

@Entity('plan')
@Unique(['nombrePlan'])
export class Plan {
  @PrimaryGeneratedColumn()
  idPlan: number;
  @Column()
  nombrePlan: string;
  @Column()
  cantidadAdministradores: number;
  @Column()
  cantidadGestores: number;
  @Column()
  cantidadPlantas: number;
  @Column()
  cantidadUsuarios: number;
  @Column()
  estadoPlan: boolean;

  @OneToMany(() => Suscripcion, (suscripcion) => suscripcion.plan, {
    cascade: true,
  })
  suscripciones: Suscripcion[];
}
