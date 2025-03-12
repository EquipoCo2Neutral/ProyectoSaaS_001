import { Planta } from 'src/administracion/planta/entities/planta.entity';
import { Suscripcion } from 'src/administracion/suscripcion/entities/suscripcion.entity';
import { Usuario } from 'src/administracion/usuario/entities/usuario.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm';


@Entity('inquilino')
export class Inquilino {
    @PrimaryGeneratedColumn('uuid')
    inquilinoId: string;

    @Column()
    rutInquilino: number;

    @Column()
    nombreInquilino: string;

    @Column()
    direccionInquilino: string;

    @Column()
    telefonoInquilino: number;

    @Column()
    correoInquilino: string;

    @Column()
    sectorE: string;

    @Column()
    subSectorE: string;

    @Column()
    estadoInquilino: boolean;

    @ManyToOne(() => Suscripcion)
    suscripcion: Suscripcion;

    @OneToMany(() => Usuario, usuario => usuario.inquilino, {cascade: true})
    usuarios: Usuario[];

    @OneToMany(() => Planta, planta => planta.inquilino, {cascade: true})
    plantas: Planta[];

}
