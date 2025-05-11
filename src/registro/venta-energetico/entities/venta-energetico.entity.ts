import { MesProceso } from 'src/gestor/mes-proceso/entities/mes-proceso.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class VentaEnergetico {
  @PrimaryGeneratedColumn('increment')
  idVentaEnergetico: number;

  @Column()
  idEnergetico: number;

  @Column({ nullable: false })
  idRegion: number;

  @Column({ nullable: false })
  idSector: number;

  @Column({ nullable: false })
  idSubSector: number;

  @Column({ nullable: false })
  idUnidad: number;

  @Column({ nullable: false })
  cantidad: number;

  @ManyToOne(() => MesProceso, (mesProceso) => mesProceso.ventaEnergetico, {
    nullable: false,
  })
  mesProceso: MesProceso;
}
