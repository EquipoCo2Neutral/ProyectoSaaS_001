import { Regiones } from 'src/complementos/regiones/entities/regione.entity';
import { Adquisicione } from 'src/registro/adquisiciones/entities/adquisicione.entity';
import { Exportacione } from 'src/registro/exportaciones/entities/exportacione.entity';
import {
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';

@Entity()
@Unique(['nombre'])
export class Pais {
  @PrimaryGeneratedColumn('increment')
  idPais: number;

  @Column({ type: 'varchar', length: 100 })
  nombre: string;

  @OneToMany(() => Regiones, (regiones) => regiones, { cascade: true })
  regiones: Regiones[];

  @OneToMany(() => Exportacione, (exportacion) => exportacion.pais, {
    cascade: true,
  })
  exportacion: Exportacione[];

  @OneToMany(() => Adquisicione, (a) => a.paisOrigen, {
    cascade: true,
  })
  adquisicion: Adquisicione[];
}
