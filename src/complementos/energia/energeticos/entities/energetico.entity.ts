import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, Unique } from "typeorm";
import { GrupoEnergetico } from "../../grupo-energetico/entities/grupo-energetico.entity";
import { Unidade } from "../../unidades/entities/unidade.entity";

@Entity()
@Unique(["nombreEnergetico"])
export class Energetico {
    @PrimaryGeneratedColumn("increment")
    idEnergetico: number;
    
    @Column({ type: 'varchar', length: 100 })
    nombreEnergetico: string;

    @ManyToOne(() =>GrupoEnergetico)
    grupoEnergetico: GrupoEnergetico; 

    @OneToMany (()=> Unidade,(unidades)=> unidades, {cascade: true})
    unidades: Unidade[];
}
