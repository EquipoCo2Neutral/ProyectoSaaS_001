import { IsBoolean, IsEmail, IsInt, IsNotEmpty, IsString } from 'class-validator';

export class CreateInquilinoDto {

    @IsInt({ message: 'El rut debe ser un número entero' })
    @IsNotEmpty({ message: 'El rut es requerido' })
    rutInquilino: number;

    @IsString({ message: 'El nombre debe ser un string' })
    @IsNotEmpty({ message: 'El nombre es requerido' })
    nombreInquilino: string;

    @IsString({ message: 'La dirección debe ser un string' })
    @IsNotEmpty({ message: 'La dirección es requerida' })
    direccionInquilino: string;

    @IsInt({ message: 'El teléfono debe ser un string' })
    @IsNotEmpty({ message: 'El teléfono es requerido' })
    telefonoInquilino: number;

    @IsEmail({}, { message: 'El correo debe ser un email válido' })
    @IsNotEmpty({ message: 'El correo es requerido' })
    correoInquilino: string;

    @IsString({ message: 'El sector debe ser string' })
    @IsNotEmpty({ message: 'El sector es requerido' })
    sectorE: string;

    @IsString({ message: 'El subsector debe ser string' })
    @IsNotEmpty({ message: 'El subsector es requerido' })
    subSectorE: string;

    @IsBoolean({ message: 'El estado debe ser un valor boolean' })
    @IsNotEmpty({ message: 'El estado es requerido' })
    estadoInquilino: boolean;

    @IsInt({ message: 'El suscripcionId debe ser un número entero' })
    @IsNotEmpty({ message: 'El suscripcionId es requerido' })
    suscripcionId: number;

}
