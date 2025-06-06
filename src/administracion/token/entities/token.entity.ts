import { UUID } from "crypto";
import { Usuario } from "src/administracion/usuario/entities/usuario.entity";
import { Column, CreateDateColumn, Entity, Index, ManyToOne, PrimaryGeneratedColumn, Unique } from "typeorm";

@Entity('token')
@Unique(['token'])
export class Token {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    token: string;


    @ManyToOne (() => Usuario ) 
    usuario: Usuario;

    @Column({type: 'timestamp'})
    @Index()
    expiresAt: Date;
    
}
