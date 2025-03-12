import { Planta } from 'src/administracion/planta/entities/planta.entity';
import { Regiones } from 'src/complementos/regiones/entities/regione.entity';
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity('comunas')
export class Comuna {
  @PrimaryGeneratedColumn('increment')
  idComuna: number;
  @Column()
  nombre: string;

  @ManyToOne(() => Regiones)
  region: Regiones;

  @OneToMany(() => Planta, planta => planta.comuna, {cascade: true})
  plantas: Planta[];

}
