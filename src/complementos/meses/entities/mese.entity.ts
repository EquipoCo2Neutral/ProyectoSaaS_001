import { MesProceso } from 'src/gestor/mes-proceso/entities/mes-proceso.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Mese {
  @PrimaryGeneratedColumn('increment')
  idMes: number;
  @Column()
  nombre: string;
  @OneToMany(() => MesProceso, (mesProceso) => mesProceso.mes)
  mesesProceso: MesProceso[];
}
