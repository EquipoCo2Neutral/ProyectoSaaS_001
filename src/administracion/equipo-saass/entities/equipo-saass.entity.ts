import { Rol } from 'src/administracion/rol/entities/rol.entity';
import {
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';

@Entity('equipo_saass')
@Unique(['correo'])
export class EquipoSaass {
  @PrimaryGeneratedColumn('uuid')
  idEquipo: string;

  @Column()
  nombre: string;

  @Column()
  apellido: string;

  @Column()
  correo: string;

  @Column()
  contrasena: string;

  @ManyToOne(() => Rol)
  rol: Rol;
}
