import { Usuario } from 'src/administracion/usuario/entities/usuario.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';

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

  @ManyToOne(() => Usuario)
  usuario: Usuario;

}


