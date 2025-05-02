import { MesProceso } from "src/gestor/mes-proceso/entities/mes-proceso.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";



@Entity()
export class Generacion {
    @PrimaryGeneratedColumn('increment')
    idGeneracion: number;
  
    @Column()
    idTecnologia: number;

    @Column()
    idUnidad_CGB: number;

    @Column()
    idUnidad_Ci: number;

    @Column({ type: 'int', nullable:true} )
    idUnidad_Cena: number | null;

    @Column({ type: 'int', nullable:true} )
    idUnidad_Ce: number;

    @Column({ type: 'int', nullable:true})
    idEnergetico: number;

    @Column({ type: 'int', nullable:true})
    consumoEnergetico: number;

    @Column()
    cantidadGeneradaBruta: number;

    @Column()
    capacidadInstalada: number;

    @Column({ type: 'int', nullable:true})
    cantidadEnergiaNoAprovechada: number | null;

    @Column({ type: 'varchar', nullable:true})
    Observaciones: string | null;

    @Column({ type: 'varchar', nullable:true})
    Tipo: string | null;

    @ManyToOne(() => MesProceso, {
      nullable: false,
    })
      mesProceso: MesProceso;
  

}
