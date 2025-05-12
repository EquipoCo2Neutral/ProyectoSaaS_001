import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { SectorEconomico } from '../../sector-economico/entities/sector-economico.entity';
import { VentaEnergetico } from 'src/registro/venta-energetico/entities/venta-energetico.entity';
import { VentaElectricidad } from 'src/registro/venta-electricidad/entities/venta-electricidad.entity';

@Entity()
export class SubSectorEconomico {
  @PrimaryGeneratedColumn('increment')
  idSubSector: number;

  @Column()
  nombreSubSector: string;

  @ManyToOne(
    () => SectorEconomico,
    (sectorEconomico) => sectorEconomico.subSectorEconomico,
    {
      nullable: false,
    },
  )
  sectorEconomico: SectorEconomico;

  @OneToMany(() => VentaEnergetico, (venta) => venta.subSector)
  ventas: VentaEnergetico[];

  @OneToMany(() => VentaElectricidad, (ventaE) => ventaE.subSectorE, {
    cascade: true,
  })
  ventaElectricidad: VentaElectricidad[];
}
