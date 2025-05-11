import { MesProceso } from 'src/gestor/mes-proceso/entities/mes-proceso.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Exportacione {
  @PrimaryGeneratedColumn('increment')
  idExportacion: number;

  @Column({ nullable: false })
  idEnergetico: number;

  @Column({ nullable: false })
  idPais: number;

  @Column({ nullable: false })
  empresaDestino: string;

  @Column({ nullable: false })
  cantidad: number;

  @Column({ nullable: false })
  idUnidad: number;

  @ManyToOne(() => MesProceso, (mesProceso) => mesProceso.exportacion, {
    nullable: false,
  })
  mesProceso: MesProceso;
}
