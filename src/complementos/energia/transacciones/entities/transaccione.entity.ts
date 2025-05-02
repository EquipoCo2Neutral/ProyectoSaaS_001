import { Column, Entity, PrimaryGeneratedColumn, Unique } from "typeorm";



@Entity()
@Unique(["nombreTransaccion"])
export class Transaccione {
  @PrimaryGeneratedColumn("increment")
  idTransaccion: number;
  
  @Column({ type: 'varchar', length: 100 })
  nombreTransaccion: string;
}
