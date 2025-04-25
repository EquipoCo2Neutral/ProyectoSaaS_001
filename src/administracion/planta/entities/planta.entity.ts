import { Inquilino } from 'src/administracion/inquilino/entities/inquilino.entity';
import { Usuario } from 'src/administracion/usuario/entities/usuario.entity';
import { Comuna } from 'src/complementos/comunas/entities/comuna.entity';
import { Proceso } from 'src/gestor/proceso/entities/proceso.entity';
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';

@Entity('planta')
@Unique(['nombre'])
export class Planta {
  @PrimaryGeneratedColumn('uuid')
  idPlanta: string;

  @Column()
  nombre: string;

  @Column()
  direccion: string;

  @Column()
  estado: boolean;
  @OneToMany(() => Proceso, (proceso) => proceso.planta)
  procesos: Proceso[];

  @ManyToOne(() => Usuario)
  usuario: Usuario;

  @ManyToOne(() => Inquilino)
  inquilino: Inquilino;

  @ManyToOne(() => Comuna)
  comuna: Comuna;
}
