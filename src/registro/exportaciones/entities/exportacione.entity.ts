import { Energetico } from 'src/complementos/energia/energeticos/entities/energetico.entity';
import { Unidade } from 'src/complementos/energia/unidades/entities/unidade.entity';
import { Pais } from 'src/complementos/paises/entities/paise.entity';
import { MesProceso } from 'src/gestor/mes-proceso/entities/mes-proceso.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Exportacione {
  @PrimaryGeneratedColumn('increment')
  idExportacion: number;

  @Column({ nullable: false })
  empresaDestino: string;

  @Column({ nullable: false })
  cantidad: number;

  @ManyToOne(() => MesProceso, (mesProceso) => mesProceso.exportacion, {
    nullable: false,
  })
  mesProceso: MesProceso;

  @ManyToOne(() => Unidade, (unidad) => unidad.exportacion, {
    nullable: false,
  })
  @JoinColumn({ name: 'idUnidad' })
  unidad: Unidade;

  @ManyToOne(() => Pais, (pais) => pais.exportacion, { nullable: false })
  @JoinColumn({ name: 'idPais' })
  pais: Pais;

  @ManyToOne(() => Energetico, (energetico) => energetico.exportaciones, {
    nullable: false,
  })
  @JoinColumn({ name: 'idEnergetico' })
  energetico: Energetico;
}
