import { Energetico } from 'src/complementos/energia/energeticos/entities/energetico.entity';
import { GrupoEnergetico } from 'src/complementos/energia/grupo-energetico/entities/grupo-energetico.entity';
import { Transaccione } from 'src/complementos/energia/transacciones/entities/transaccione.entity';
import { Unidade } from 'src/complementos/energia/unidades/entities/unidade.entity';
import { Pais } from 'src/complementos/paises/entities/paise.entity';
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
export class Adquisicione {
  @PrimaryGeneratedColumn('increment')
  idAdquisicion: number;

  @Column('float')
  Cantidad: number;

  @Column({ type: 'float', nullable: true })
  cantidadInicial?: number | null;

  @Column({ type: 'float', nullable: true })
  cantidadFinal?: number | null;

  @Column({ type: 'varchar', nullable: true })
  empresaOrigen?: string | null;

  @Column({ type: 'float', nullable: true })
  poderCalorifico?: number | null;

  @Column({ type: 'int', nullable: true })
  porcentajeHumedad?: number | null;

  @Column({ type: 'boolean', nullable: true })
  compraMercadoSpot: boolean = false;

  @ManyToOne(() => Transaccione, (transaccion) => transaccion.adquisicion, {
    nullable: false,
  })
  @JoinColumn({ name: 'idTransaccion' })
  transaccion: Transaccione;

  @ManyToOne(() => GrupoEnergetico, (gE) => gE.adquisicion, {
    nullable: false,
  })
  @JoinColumn({ name: 'idGrupoEnergetico' })
  grupoEnergetico: GrupoEnergetico;

  @ManyToOne(() => Energetico, (e) => e.adquisicion, {
    nullable: false,
  })
  @JoinColumn({ name: 'idEnergetico' })
  energetico: Energetico;

  @ManyToOne(() => Pais, (pais) => pais.adquisicion, {
    nullable: true,
  })
  @JoinColumn({ name: 'idPaisOrigen' })
  paisOrigen: Pais | null;

  @ManyToOne(() => Unidade, (unidad) => unidad.adquisicion, {
    nullable: false,
  })
  @JoinColumn({ name: 'idUnidad' })
  unidad: Unidade;

  @ManyToOne(() => MesProceso, (mesProceso) => mesProceso.adquisiciones, {
    nullable: false,
  })
  @JoinColumn({ name: 'idMesProceso' })
  mesProceso: MesProceso;

  @OneToOne(() => ResumenTransaccion)
  @JoinColumn({ name: 'idResumenTransaccion' })
  resumenTransaccion: ResumenTransaccion;
}
