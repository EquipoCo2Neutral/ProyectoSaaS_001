import { Inquilino } from 'src/administracion/inquilino/entities/inquilino.entity';
import { Planta } from 'src/administracion/planta/entities/planta.entity';
import { CategoriaRegistro } from 'src/complementos/energia/categoria-registro/entities/categoria-registro.entity';
import { Energetico } from 'src/complementos/energia/energeticos/entities/energetico.entity';
import { Unidade } from 'src/complementos/energia/unidades/entities/unidade.entity';
import { MesProceso } from 'src/gestor/mes-proceso/entities/mes-proceso.entity';
import { Proceso } from 'src/gestor/proceso/entities/proceso.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class ResumenTransaccion {
  @PrimaryGeneratedColumn('increment')
  idResumenTransaccion: number;

  @ManyToOne(() => Energetico, (e) => e.resumenTransaccion, {
    nullable: false,
  })
  @JoinColumn({ name: 'idEnergetico' })
  energetico: Energetico;

  @Column('float')
  cantidadEntrada: number;
  @Column('float')
  cantidadSalida: number;

  @ManyToOne(() => Unidade, (e) => e.resumenTransaccion, {
    nullable: false,
  })
  @JoinColumn({ name: 'idUnidad' })
  unidad: Unidade;

  @ManyToOne(() => MesProceso, (mesProceso) => mesProceso.resumenTransaccion, {
    nullable: false,
  })
  @JoinColumn({ name: 'idMesProceso' })
  mesProceso: MesProceso;

  @ManyToOne(() => Proceso, (proceso) => proceso.resumenTransaccion, {
    nullable: false,
  })
  @JoinColumn({ name: 'idProceso' })
  proceso: Proceso;

  @ManyToOne(() => Inquilino, (inquilino) => inquilino.resumenTransaccion, {
    nullable: false,
  })
  @JoinColumn({ name: 'inquilinoId' })
  inquilino: Inquilino;

  @ManyToOne(() => Planta, (p) => p.resumenTransaccion, {
    nullable: false,
  })
  @JoinColumn({ name: 'idPlanta' })
  planta: Planta;

  @ManyToOne(() => CategoriaRegistro, (p) => p.resumenTransaccion, {
    nullable: false,
  })
  @JoinColumn({ name: 'idCategoriaRegistro' })
  categoriaRegistro: CategoriaRegistro;

  @Column('float')
  cantidadGeneral: number;
  @Column('float')
  teraCalorias: number;
}
