import { Comuna } from 'src/complementos/comunas/entities/comuna.entity';
import { Pais } from 'src/complementos/paises/entities/paise.entity';
import { VentaElectricidad } from 'src/registro/venta-electricidad/entities/venta-electricidad.entity';
import { VentaEnergetico } from 'src/registro/venta-energetico/entities/venta-energetico.entity';
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';

@Entity('regiones')
@Unique(['nombre'])
export class Regiones {
  @PrimaryGeneratedColumn('increment')
  idRegion: number;

  @Column()
  nombre: string;

  @ManyToOne(() => Pais)
  pais: Pais;

  @OneToMany(() => Comuna, (comuna) => comuna.region, { cascade: true })
  comunas: Comuna[];
  @OneToMany(() => VentaEnergetico, (venta) => venta.region, { cascade: true })
  ventas: VentaEnergetico[];

  @OneToMany(() => VentaElectricidad, (ventaE) => ventaE.region, {
    cascade: true,
  })
  ventaElectricidad: VentaElectricidad[];
}
