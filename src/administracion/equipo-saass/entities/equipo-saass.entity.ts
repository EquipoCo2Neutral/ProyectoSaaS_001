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

  @Column({ nullable: false, select: false })
  contrasena: string;

  @ManyToOne(() => Rol, (rol) => rol.equipoSaass)
  rol: Rol;
}
