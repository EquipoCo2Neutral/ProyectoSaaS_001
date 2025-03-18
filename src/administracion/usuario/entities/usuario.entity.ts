import { Inquilino } from 'src/administracion/inquilino/entities/inquilino.entity';
import { Persona } from 'src/administracion/persona/entities/persona.entity';
import { Planta } from 'src/administracion/planta/entities/planta.entity';
import { Rol } from 'src/administracion/rol/entities/rol.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  Unique,
} from 'typeorm';

@Entity('usuario')
@Unique(['correoUsuario'])
export class Usuario {
  @PrimaryGeneratedColumn('uuid')
  usuarioId: string;

  @Column({ unique: true, nullable: false })
  correoUsuario: string;

  @Column({ nullable: false, select: false })
  contrasenaUsuario: string;

  @ManyToOne(() => Rol)
  rol: Rol;

  @ManyToOne(() => Inquilino)
  inquilino: Inquilino;

  @OneToMany(() => Persona, (persona) => persona.usuario, { cascade: true })
  personas: Persona[];

  @OneToMany(() => Planta, (planta) => planta.usuario, { cascade: true })
  plantas: Planta[];
}
