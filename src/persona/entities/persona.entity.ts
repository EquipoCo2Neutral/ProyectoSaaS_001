import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('persona')
export class Persona {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column()
  rut: number;
  @Column()
  nombre: string;
  @Column()
  primerApellido: string;
  @Column()
  segundoApellido: string;
  @Column()
  telefono: number;
}

console.log('test');
