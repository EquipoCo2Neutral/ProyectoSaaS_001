import { Inquilino } from "src/administracion/inquilino/entities/inquilino.entity";
import { Usuario } from "src/administracion/usuario/entities/usuario.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('planta')
export class Planta {

    @PrimaryGeneratedColumn('uuid')
    idPlanta: string;

    @Column()
    nombre: string;

    @Column()
    direccion: string;

    @Column()
    estado: boolean;

    @ManyToOne(() => Usuario)
    usuario: Usuario;

    @ManyToOne(() => Inquilino)
    inquilino: Inquilino;

    //Pendiente una columna para comunas la cual debe ser una relacion con la tabla comunas
}
