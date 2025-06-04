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
export class Generacion {
  @PrimaryGeneratedColumn('increment')
  idGeneracion: number;

  @Column()
  idTecnologia: number;
  @Column({ type: 'varchar', nullable: true })
  Observaciones?: string | null;

  @Column({ type: 'varchar', nullable: true })
  Tipo?: string | null;

  @Column({ type: 'float' })
  cantidadGeneradaBruta: number;

  @Column({ type: 'float' })
  capacidadInstalada: number;

  @Column({ type: 'float', nullable: true })
  consumoEnergetico?: number | null;

  @Column({ type: 'float', nullable: true })
  cantidadEnergiaNoAprovechada?: number | null;

  //relaciones

  @Column()
  idUnidad_CGB: number;

  @ManyToOne(() => Unidade, (u) => u.generacion_UCGB, {
    nullable: false,
  })
  @JoinColumn({ name: 'idUnidad_CGB' })
  unidadCGB: Unidade;

  @Column()
  idUnidad_Ci: number;

  @ManyToOne(() => Unidade, (u) => u.generacion_UCI, {
    nullable: false,
  })
  @JoinColumn({ name: 'idUnidad_Ci' })
  unidadCI: Unidade;

  @Column({ type: 'int', nullable: true })
  idUnidad_Cena?: number | null;

  @ManyToOne(() => Unidade, (u) => u.generacion_UCENA, {
    nullable: true,
  })
  @JoinColumn({ name: 'idUnidad_Cena' })
  unidadCENA: Unidade;

  @Column({ type: 'int', nullable: true })
  idUnidad_Ce?: number | null;

  @ManyToOne(() => Unidade, (u) => u.generacion_UCE, {
    nullable: true,
  })
  @JoinColumn({ name: 'idUnidad_Ce' })
  unidadCE: Unidade;

  @ManyToOne(() => MesProceso, (mesProceso) => mesProceso.generacion, {
    nullable: false,
  })
  mesProceso: MesProceso;
  @ManyToOne(() => Energetico, (energetico) => energetico.generacion, {
    nullable: true,
  })
  @JoinColumn({ name: 'idEnergetico' })
  energetico: Energetico | null;

  @OneToOne(() => ResumenTransaccion)
  @JoinColumn({ name: 'idResumenTransaccion' })
  resumenTransaccion: ResumenTransaccion;
}
