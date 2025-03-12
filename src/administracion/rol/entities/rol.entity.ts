import { EquipoSaass } from 'src/administracion/equipo-saass/entities/equipo-saass.entity';
import { Usuario } from 'src/administracion/usuario/entities/usuario.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';

@Entity('rol')
export class Rol {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  rol: string;

  @OneToMany(() => Usuario, usuario => usuario.rol)
  usuarios: Usuario[];

  @OneToMany(() => EquipoSaass, equipoSaass => equipoSaass.rol, {cascade: true})
  equipoSaass: EquipoSaass[];

}
