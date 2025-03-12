import { IsBoolean, IsInt, IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class CreatePlantaDto {
    @IsString({ message: 'El nombre debe ser un string' })
    @IsNotEmpty({ message: 'El nombre es requerido' })
    nombre: string;

    @IsString({ message: 'La dirección debe ser un string' })
    @IsNotEmpty({ message: 'La dirección es requerida' })
    direccion: string;

    @IsBoolean({ message: 'El estado debe ser un booleano' })
    @IsNotEmpty({ message: 'El estado es requerido' })
    estado: boolean;

    @IsUUID('4', { message: 'El usuario debe ser un UUID' })
    @IsNotEmpty({ message: 'El usuario es requerido' })
    usuarioId: string;

    @IsUUID('4', { message: 'El inquilino debe ser un UUID' })
    @IsNotEmpty({ message: 'El inquilino es requerido' })
    inquilinoId: string;


    @IsInt({ message: 'La comuna debe ser un número entero' })
    @IsNotEmpty({ message: 'La comuna es requerida' })
    comunaId: number;

}
