import { MesProceso } from "src/gestor/mes-proceso/entities/mes-proceso.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";


@Entity()
export class Adquisicione {
    @PrimaryGeneratedColumn('increment')
    idAdquisicion: number;
  
    @Column()
    idTransaccion: number;
  
    @Column()
    idGrupoEnergetico: number;

    @Column()
    idEnergetico: number;

    @Column({ type: 'int', nullable:true})
    idPaisOrigen: number | null;

    @Column()
    Cantidad: number;

    @Column({ type: 'int'})
    idUnidad: number;

    @Column({ type: 'int', nullable:true})
    cantidadInicial?: number | null;

    @Column({ type: 'int', nullable:true})
    cantidadFinal?: number | null;

    @Column({ type: 'varchar', nullable:true})
    empresaOrigen?: string | null;

    @Column({ type: 'int', nullable:true})
    poderCalorifico?: number | null;

    @Column({ type: 'int', nullable:true})
    porcentajeHumedad?: number | null;

    @Column({ type: 'boolean', nullable:true})
    compraMercadoSpot: boolean = false;

    @ManyToOne(() => MesProceso, {
    nullable: false,
  })
    mesProceso: MesProceso;

  
   
 }
