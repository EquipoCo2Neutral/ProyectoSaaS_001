import { Inquilino } from 'src/administracion/inquilino/entities/inquilino.entity';
import { Usuario } from 'src/administracion/usuario/entities/usuario.entity';
import { Comuna } from 'src/complementos/comunas/entities/comuna.entity';
import {
  Column,
  Entity,
  ManyToOne,
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

  @ManyToOne(() => Usuario)
  usuario: Usuario;

  @ManyToOne(() => Inquilino)
  inquilino: Inquilino;

  @ManyToOne(() => Comuna)
  comuna: Comuna;
}
