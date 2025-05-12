import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { SubSectorEconomico } from '../../sub-sector-economico/entities/sub-sector-economico.entity';
import { VentaEnergetico } from 'src/registro/venta-energetico/entities/venta-energetico.entity';
import { VentaElectricidad } from 'src/registro/venta-electricidad/entities/venta-electricidad.entity';

@Entity()
export class SectorEconomico {
  @PrimaryGeneratedColumn('increment')
  idSector: number;

  @Column()
  nombreSector: string;

  @OneToMany(
    () => SubSectorEconomico,
    (subSectorEconomico) => subSectorEconomico.sectorEconomico,
    {
      cascade: true,
    },
  )
  subSectorEconomico: SubSectorEconomico[];

  @OneToMany(() => VentaEnergetico, (venta) => venta.sector, { cascade: true })
  ventas: VentaEnergetico[];

  @OneToMany(() => VentaElectricidad, (ventaE) => ventaE.sectorE, {
    cascade: true,
  })
  ventaElectricidad: VentaElectricidad[];
}
