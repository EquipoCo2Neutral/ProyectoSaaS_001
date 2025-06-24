import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';
import { Energetico } from '../../energeticos/entities/energetico.entity';
import { VentaEnergetico } from 'src/registro/venta-energetico/entities/venta-energetico.entity';
import { Exportacione } from 'src/registro/exportaciones/entities/exportacione.entity';
import { VentaElectricidad } from 'src/registro/venta-electricidad/entities/venta-electricidad.entity';
import { UsosFinale } from 'src/registro/usos-finales/entities/usos-finale.entity';
import { Transformacione } from 'src/registro/transformaciones/entities/transformacione.entity';
import { Generacion } from 'src/registro/generacion/entities/generacion.entity';
import { Adquisicione } from 'src/registro/adquisiciones/entities/adquisicione.entity';
import { ResumenTransaccion } from 'src/registro/resumen-transaccion/entities/resumen-transaccion.entity';

@Entity()
export class Unidade {
  @PrimaryGeneratedColumn('increment')
  idUnidad: number;

  @Column({ type: 'varchar', length: 100 })
  nombreUnidad: string;

  @ManyToOne(() => Energetico)
  energetico: Energetico;

  @OneToMany(() => VentaElectricidad, (ventaE) => ventaE.unidad, {
    cascade: true,
  })
  ventaElectricidad: VentaElectricidad[];

  @OneToMany(() => VentaEnergetico, (venta) => venta.unidad)
  ventas: VentaEnergetico[];

  @OneToMany(() => Exportacione, (exportacion) => exportacion.unidad)
  exportacion: Exportacione[];

  @OneToMany(() => UsosFinale, (usoFinal) => usoFinal.unidad, {
    cascade: true,
  })
  usoFinal: UsosFinale[];

  @OneToMany(() => Transformacione, (transformacion) => transformacion.unidad, {
    cascade: true,
  })
  transformacion: Transformacione[];

  @OneToMany(() => Generacion, (g) => g.unidadCGB, {
    cascade: true,
  })
  generacion_UCGB: Unidade[];

  @OneToMany(() => Generacion, (g) => g.unidadCI, {
    cascade: true,
  })
  generacion_UCI: Unidade[];
  @OneToMany(() => Generacion, (g) => g.unidadCENA, {
    cascade: true,
  })
  generacion_UCENA: Unidade[];

  @OneToMany(() => Generacion, (g) => g.unidadCE, {
    cascade: true,
  })
  generacion_UCE: Unidade[];

  @OneToMany(() => Adquisicione, (a) => a.unidad, {
    cascade: true,
  })
  adquisicion: Adquisicione[];

  @OneToMany(() => ResumenTransaccion, (a) => a.unidad, {
    cascade: true,
  })
  resumenTransaccion: ResumenTransaccion[];
  
  @OneToMany(() => ResumenTransaccion, (uo) => uo.uOriginal, {
    cascade: true,
  })
  resumenTransaccionOriginal: ResumenTransaccion[];
}
