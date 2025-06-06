import {
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';
import { Energetico } from '../../energeticos/entities/energetico.entity';
import { Adquisicione } from 'src/registro/adquisiciones/entities/adquisicione.entity';

@Entity()
@Unique(['nombreGrupoEnergetico'])
export class GrupoEnergetico {
  @PrimaryGeneratedColumn('increment')
  idGrupoEnergetico: number;

  @Column({ type: 'varchar', length: 100 })
  nombreGrupoEnergetico: string;

  @OneToMany(() => Energetico, (energetico) => energetico, { cascade: true })
  energetico: Energetico[];

  @OneToMany(() => Adquisicione, (adquisicion) => adquisicion.grupoEnergetico, {
    cascade: true,
  })
  adquisicion: Adquisicione[];
}
