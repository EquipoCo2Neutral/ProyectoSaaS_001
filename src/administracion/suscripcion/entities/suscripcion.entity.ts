import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('suscripcion')
export class Suscripcion {
    @PrimaryGeneratedColumn('uuid')
    id: string;
}
