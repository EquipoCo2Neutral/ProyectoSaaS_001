import { Column, Entity, ManyToOne, PrimaryGeneratedColumn, Unique } from "typeorm";
import { Energetico } from "../../energeticos/entities/energetico.entity";


@Entity()
export class Unidade {
    @PrimaryGeneratedColumn("increment")
    idUnidad: number;
    
    @Column({ type: 'varchar', length: 100 })
    nombreUnidad: string;

    @ManyToOne(()=> Energetico)
    energetico: Energetico;
}
