import { EquipoSaass } from 'src/administracion/equipo-saass/entities/equipo-saass.entity';
import { Usuario } from 'src/administracion/usuario/entities/usuario.entity';
import { Role } from 'src/common/enums/rol.enum';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  Unique,
} from 'typeorm';

@Entity('rol')
@Unique(['rol'])
export class Rol {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ type: 'enum', enum: Role })
  rol: Role;

  @OneToMany(() => Usuario, (usuario) => usuario.rol)
  usuarios: Usuario[];

  @OneToMany(() => EquipoSaass, (equipoSaass) => equipoSaass.rol, {
    cascade: true,
  })
  equipoSaass: EquipoSaass[];
}
