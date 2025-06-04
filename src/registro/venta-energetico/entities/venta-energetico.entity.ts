import { Energetico } from 'src/complementos/energia/energeticos/entities/energetico.entity';
import { SectorEconomico } from 'src/complementos/energia/sector-economico/entities/sector-economico.entity';
import { SubSectorEconomico } from 'src/complementos/energia/sub-sector-economico/entities/sub-sector-economico.entity';
import { Unidade } from 'src/complementos/energia/unidades/entities/unidade.entity';
import { Regiones } from 'src/complementos/regiones/entities/regione.entity';
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
export class VentaEnergetico {
  @PrimaryGeneratedColumn('increment')
  idVentaEnergetico: number;

  @ManyToOne(() => Energetico, (energetico) => energetico.ventas)
  @JoinColumn({ name: 'idEnergetico' })
  energetico: Energetico;

  @ManyToOne(() => Regiones, (region) => region.ventas)
  @JoinColumn({ name: 'idRegion' })
  region: Regiones;

  @ManyToOne(() => SectorEconomico, (sector) => sector.ventas, {
    nullable: false,
  })
  @JoinColumn({ name: 'idSector' })
  sector: SectorEconomico;

  @ManyToOne(() => SubSectorEconomico, (subSector) => subSector.ventas, {
    nullable: false,
  })
  @JoinColumn({ name: 'idSubSector' })
  subSector: SubSectorEconomico;

  @ManyToOne(() => Unidade, (unidad) => unidad.ventas, {
    nullable: false,
  })
  @JoinColumn({ name: 'idUnidad' })
  unidad: Unidade;

  @Column('float', { nullable: false })
  cantidad: number;

  @ManyToOne(() => MesProceso, (mesProceso) => mesProceso.ventaEnergetico, {
    nullable: false,
  })
  mesProceso: MesProceso;

  @OneToOne(() => ResumenTransaccion)
  @JoinColumn({ name: 'idResumenTransaccion' })
  resumenTransaccion: ResumenTransaccion;
}
