import { Inquilino } from 'src/administracion/inquilino/entities/inquilino.entity';
import { Plan } from 'src/administracion/plan/entities/plan.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, ManyToOne, OneToMany } from 'typeorm';

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

    @OneToMany(() => Inquilino, inquilino => inquilino.suscripcion, {cascade: true})
    inquilinos: Inquilino[];
}
