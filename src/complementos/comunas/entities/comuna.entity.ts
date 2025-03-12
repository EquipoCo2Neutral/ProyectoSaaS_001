import { Regiones } from 'src/complementos/regiones/entities/regione.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity('comunas')
export class Comuna {
  @PrimaryGeneratedColumn('increment')
  idComuna: number;
  @Column()
  nombre: string;

  @ManyToOne(() => Regiones)
  region: Regiones;
}
