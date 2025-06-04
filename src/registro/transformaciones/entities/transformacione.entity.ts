import { Energetico } from 'src/complementos/energia/energeticos/entities/energetico.entity';
import { Unidade } from 'src/complementos/energia/unidades/entities/unidade.entity';
import { MesProceso } from 'src/gestor/mes-proceso/entities/mes-proceso.entity';
import { ResumenTransaccion } from 'src/registro/resumen-transaccion/entities/resumen-transaccion.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Transformacione {
  @PrimaryGeneratedColumn('increment')
  idTransformacion: number;

  @Column({ nullable: false })
  cantidad: number;

  @ManyToOne(() => MesProceso, (mesProceso) => mesProceso.transformacion, {
    nullable: false,
  })
  mesProceso: MesProceso;

  @ManyToOne(
    () => Energetico,
    (energetico) => energetico.transformacionEntrada,
    {
      nullable: false,
    },
  )
  @JoinColumn({ name: 'idEnergetico' })
  energetico: Energetico;

  @Column()
  idEnergeticoProducido: number;

  @ManyToOne(
    () => Energetico,
    (energetico) => energetico.transformacionSalida,
    {
      nullable: false,
    },
  )
  @JoinColumn({ name: 'idEnergeticoProducido' })
  energeticoProducido: Energetico;

  @ManyToOne(() => Unidade, (unidad) => unidad.transformacion, {
    nullable: false,
  })
  @JoinColumn({ name: 'idUnidad' })
  unidad: Unidade;

  @OneToOne(() => ResumenTransaccion)
  @JoinColumn({ name: 'idResumenTransaccion' })
    resumenTransaccion: ResumenTransaccion;
}
