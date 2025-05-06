import { MesProceso } from 'src/gestor/mes-proceso/entities/mes-proceso.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class VentaElectricidad {
  @PrimaryGeneratedColumn('increment')
  idVentaElectricidad: number;

  @Column({ nullable: false })
  idDestinoVenta: number;
  @Column({ nullable: true })
  ventaMercadoSpot: boolean;
  @Column({ nullable: false })
  cantidadVendida: number;
  @Column({ nullable: false })
  idUnidad: number;
  @Column({ nullable: true })
  empresaDestino: string;
  @Column({ nullable: true })
  idRegion: number;
  @Column({ nullable: true })
  idSectorEconomico: number;
  @Column({ nullable: true })
  idSubSectorEconomico: number;

  @ManyToOne(() => MesProceso, (mesProceso) => mesProceso.ventaElectricidad, {
    nullable: false,
  })
  mesProceso: MesProceso;
}
