import { SectorEconomico } from 'src/complementos/energia/sector-economico/entities/sector-economico.entity';
import { SubSectorEconomico } from 'src/complementos/energia/sub-sector-economico/entities/sub-sector-economico.entity';
import { Unidade } from 'src/complementos/energia/unidades/entities/unidade.entity';
import { Regiones } from 'src/complementos/regiones/entities/regione.entity';
import { MesProceso } from 'src/gestor/mes-proceso/entities/mes-proceso.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class VentaElectricidad {
  @PrimaryGeneratedColumn('increment')
  idVentaElectricidad: number;

  //desde el front
  @Column({ nullable: false })
  idDestinoVenta: number;
  @Column({ nullable: true })
  ventaMercadoSpot: boolean;
  @Column({ nullable: false })
  cantidadVendida: number;
  @Column({ nullable: true })
  empresaDestino: string;

  @ManyToOne(() => MesProceso, (mesProceso) => mesProceso.ventaElectricidad, {
    nullable: false,
  })
  mesProceso: MesProceso;

  @ManyToOne(() => Unidade, (unidad) => unidad.ventaElectricidad, {
    nullable: false,
  })
  @JoinColumn({ name: 'idUnidad' })
  unidad: Unidade;

  @ManyToOne(() => Regiones, (regiones) => regiones.ventaElectricidad, {
    nullable: true,
  })
  @JoinColumn({ name: 'idRegion' })
  region: Regiones;

  @ManyToOne(() => SectorEconomico, (sectorE) => sectorE.ventaElectricidad, {
    nullable: true,
  })
  @JoinColumn({ name: 'idSectorEconomico' })
  sectorE: SectorEconomico;

  @ManyToOne(
    () => SubSectorEconomico,
    (subSector) => subSector.ventaElectricidad,
    {
      nullable: true,
    },
  )
  @JoinColumn({ name: 'idSubSectorEconomico' })
  subSectorE: SubSectorEconomico;
}
