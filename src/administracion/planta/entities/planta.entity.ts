import { Inquilino } from 'src/administracion/inquilino/entities/inquilino.entity';
import { Usuario } from 'src/administracion/usuario/entities/usuario.entity';
import { Comuna } from 'src/complementos/comunas/entities/comuna.entity';
import { Proceso } from 'src/gestor/proceso/entities/proceso.entity';
import { ResumenTransaccion } from 'src/registro/resumen-transaccion/entities/resumen-transaccion.entity';
import {
  Column,
  Entity,
  JoinColumn,
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

  @ManyToOne(() => Usuario, { nullable: true })
  @JoinColumn({ name: 'usuarioId' })
  usuario: Usuario;

  @Column({ nullable: true })
  usuarioId: string | null;

  @ManyToOne(() => Inquilino)
  inquilino: Inquilino;

  @ManyToOne(() => Comuna)
  comuna: Comuna;

  @OneToMany(
    () => ResumenTransaccion,
    (resumenTransaccion) => resumenTransaccion.planta,
    {
      cascade: true,
    },
  )
  resumenTransaccion: ResumenTransaccion[];
}
