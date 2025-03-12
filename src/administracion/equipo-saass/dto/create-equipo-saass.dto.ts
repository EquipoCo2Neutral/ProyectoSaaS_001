import {IsInt, IsNotEmpty, IsString } from 'class-validator';

export class CreateEquipoSaassDto {

    @IsString({ message: 'El nombre debe ser un string' })
    @IsNotEmpty({ message: 'El nombre es requerido' })
    nombre: string;

    @IsString({ message: 'El apellido debe ser un string' })
    @IsNotEmpty({ message: 'El apellido es requerido' })
    apellido: string;

    @IsString({ message: 'La contraseña debe ser un string' })
    @IsNotEmpty({ message: 'La contraseña es requerida' })
    contrasena: string;

    @IsInt({ message: 'El rolId debe ser un número entero' })
    @IsNotEmpty({ message: 'El rolId es requerido' })
    rolId: number;
}
