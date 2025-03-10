import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('plan')
export class Plan {
    @PrimaryGeneratedColumn('uuid')
    id: string;
    @Column()
    nombrePlan: string;
    @Column()
    cantidadAdministradores: number;
    @Column()
    cantidadGestores: number;
    @Column()
    cantidadPlantas: number;
    @Column()
    cantidadUsuarios: number;
    @Column()
    estadoPlan: boolean;
}
