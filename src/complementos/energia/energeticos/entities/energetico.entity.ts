import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';
import { GrupoEnergetico } from '../../grupo-energetico/entities/grupo-energetico.entity';
import { Unidade } from '../../unidades/entities/unidade.entity';
import { VentaEnergetico } from 'src/registro/venta-energetico/entities/venta-energetico.entity';
import { Exportacione } from 'src/registro/exportaciones/entities/exportacione.entity';
import { UsosFinale } from 'src/registro/usos-finales/entities/usos-finale.entity';
import { Transformacione } from 'src/registro/transformaciones/entities/transformacione.entity';
import { Generacion } from 'src/registro/generacion/entities/generacion.entity';
import { Adquisicione } from 'src/registro/adquisiciones/entities/adquisicione.entity';

@Entity()
@Unique(['nombreEnergetico'])
export class Energetico {
  @PrimaryGeneratedColumn('increment')
  idEnergetico: number;

  @Column({ type: 'varchar', length: 100 })
  nombreEnergetico: string;

  @ManyToOne(() => GrupoEnergetico)
  grupoEnergetico: GrupoEnergetico;

  @OneToMany(() => Unidade, (unidades) => unidades, { cascade: true })
  unidades: Unidade[];

  @OneToMany(() => VentaEnergetico, (venta) => venta.energetico, {
    cascade: true,
  })
  ventas: VentaEnergetico[];

  @OneToMany(() => Exportacione, (exportacion) => exportacion.energetico, {
    cascade: true,
  })
  exportaciones: Exportacione[];

  @OneToMany(() => UsosFinale, (usoFinal) => usoFinal.energetico, {
    cascade: true,
  })
  usoFinal: UsosFinale[];

  @OneToMany(
    () => Transformacione,
    (transformacion) => transformacion.energetico,
    {
      cascade: true,
    },
  )
  transformacionEntrada: Transformacione[];

  @OneToMany(
    () => Transformacione,
    (transformacion) => transformacion.energeticoProducido,
    {
      cascade: true,
    },
  )
  transformacionSalida: Transformacione[];

  @OneToMany(() => Generacion, (generacion) => generacion.energetico, {
    cascade: true,
  })
  generacion: Generacion[];

  @OneToMany(() => Adquisicione, (a) => a.energetico, {
    cascade: true,
  })
  adquisicion: Adquisicione[];
}
