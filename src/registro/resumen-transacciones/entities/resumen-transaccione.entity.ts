import { MesProceso } from "src/gestor/mes-proceso/entities/mes-proceso.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";


@Entity()
export class ResumenTransaccione {
    @PrimaryGeneratedColumn('increment')
    idResumenTransaccion: number;

    @Column()
    Energetico: string;

    @Column()
    Categoria: string;

    @Column()
    cantidadEntrada: number;
    @Column()
    cantidadSalida: number;

    @Column()
    Unidad: string;

      
    
    
    @ManyToOne(() => MesProceso, (mesProceso) => mesProceso.resumenTransaccione, {
        nullable: false,
      })
    mesProceso: MesProceso;

}
