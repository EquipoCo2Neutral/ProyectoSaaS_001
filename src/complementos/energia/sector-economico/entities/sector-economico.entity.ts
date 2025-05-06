import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { SubSectorEconomico } from '../../sub-sector-economico/entities/sub-sector-economico.entity';

@Entity()
export class SectorEconomico {
  @PrimaryGeneratedColumn('increment')
  idSector: number;

  @Column()
  nombreSector: string;

  @OneToMany(
    () => SubSectorEconomico,
    (subSectorEconomico) => subSectorEconomico.sectorEconomico,
    {
      cascade: true,
    },
  )
  subSectorEconomico: SubSectorEconomico[];
}
