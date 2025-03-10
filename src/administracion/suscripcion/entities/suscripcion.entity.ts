import { Plan } from 'src/administracion/plan/entities/plan.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, ManyToOne } from 'typeorm';

@Entity('suscripcion')
export class Suscripcion {
    @PrimaryGeneratedColumn('increment')
    id: number;
    
    @Column()
    estado: boolean;
    
    @Column()
    diasActivo: number;

    @ManyToOne(() => Plan)
    plan: Plan;
}
