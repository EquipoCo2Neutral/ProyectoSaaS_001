import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { SectorEconomico } from '../../sector-economico/entities/sector-economico.entity';

@Entity()
export class SubSectorEconomico {
  @PrimaryGeneratedColumn('increment')
  idSubSector: number;

  @Column()
  nombreSubSector: string;

  @ManyToOne(
    () => SectorEconomico,
    (sectorEconomico) => sectorEconomico.subSectorEconomico,
    {
      nullable: false,
    },
  )
  sectorEconomico: SectorEconomico;
}
