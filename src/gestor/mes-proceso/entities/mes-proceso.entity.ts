import { Mese } from 'src/complementos/meses/entities/mese.entity';
import { Proceso } from 'src/gestor/proceso/entities/proceso.entity';
import { Adquisicione } from 'src/registro/adquisiciones/entities/adquisicione.entity';
import { Exportacione } from 'src/registro/exportaciones/entities/exportacione.entity';
import { Generacion } from 'src/registro/generacion/entities/generacion.entity';
import { ResumenTransaccion } from 'src/registro/resumen-transaccion/entities/resumen-transaccion.entity';
import { ResumenTransaccione } from 'src/registro/resumen-transacciones/entities/resumen-transaccione.entity';
import { Transformacione } from 'src/registro/transformaciones/entities/transformacione.entity';
import { UsosFinale } from 'src/registro/usos-finales/entities/usos-finale.entity';
import { VentaElectricidad } from 'src/registro/venta-electricidad/entities/venta-electricidad.entity';
import { VentaEnergetico } from 'src/registro/venta-energetico/entities/venta-energetico.entity';
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class MesProceso {
  @PrimaryGeneratedColumn('uuid')
  idMesProceso: string;

  @ManyToOne(() => Proceso, (proceso) => proceso.mesesProceso, {
    nullable: false,
  })
  proceso: Proceso;

  // mes-proceso.entity.ts
  @ManyToOne(() => Mese, (mes) => mes.mesesProceso, { nullable: false })
  mes: Mese;

  @Column()
  estado: boolean;

  @OneToMany(() => Adquisicione, (adquisicione) => adquisicione.mesProceso, {
    cascade: true,
  })
  adquisiciones: Adquisicione[];

  @OneToMany(() => Generacion, (generacion) => generacion.mesProceso, {
    cascade: true,
  })
  generacion: Generacion[];

  @OneToMany(
    () => Transformacione,
    (transformacion) => transformacion.mesProceso,
    {
      cascade: true,
    },
  )
  transformacion: Transformacione[];

  @OneToMany(() => UsosFinale, (usoFinal) => usoFinal.mesProceso, {
    cascade: true,
  })
  usoFinal: UsosFinale[];

  @OneToMany(
    () => VentaElectricidad,
    (ventaElectricidad) => ventaElectricidad.mesProceso,
    {
      cascade: true,
    },
  )
  ventaElectricidad: VentaElectricidad[];

  @OneToMany(
    () => VentaEnergetico,
    (ventaEnergetico) => ventaEnergetico.mesProceso,
    {
      cascade: true,
    },
  )
  ventaEnergetico: VentaEnergetico[];

  @OneToMany(() => Exportacione, (exportacion) => exportacion.mesProceso, {
    cascade: true,
  })
  exportacion: Exportacione[];

  @OneToMany(
    () => ResumenTransaccione,
    (resumenTransaccione) => resumenTransaccione.mesProceso,
    {
      cascade: true,
    },
  )
  resumenTransaccione: ResumenTransaccione[];

  @OneToMany(
    () => ResumenTransaccion,
    (resumenTransaccion) => resumenTransaccion.mesProceso,
    {
      cascade: true,
    },
  )
  resumenTransaccion: ResumenTransaccion[];
}
