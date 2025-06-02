import { ResumenTransaccion } from 'src/registro/resumen-transaccion/entities/resumen-transaccion.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class CategoriaRegistro {
  @PrimaryGeneratedColumn('increment')
  idCategoriaRegistro: number;

  @Column()
  nombreCategoriaRegistro: string;

  @Column()
  idRegistro: number;

  @OneToMany(() => ResumenTransaccion, (a) => a.categoriaRegistro, {
    cascade: true,
  })
  resumenTransaccion: ResumenTransaccion[];
}
