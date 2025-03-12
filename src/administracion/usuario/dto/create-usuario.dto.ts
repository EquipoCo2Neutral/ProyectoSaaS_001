import { IsEmail, IsInt, IsNotEmpty, IsString, IsUUID } from 'class-validator';


export class CreateUsuarioDto {
    @IsEmail({ }, { message: 'El correo debe ser un email válido' })
    @IsNotEmpty({ message: 'El correo es requerido' })
    correoUsuario: string;

    @IsString({ message: 'La contraseña debe ser un string' })
    @IsNotEmpty({ message: 'La contraseña es requerida' })
    contrasenaUsuario: string;

    @IsInt({ message: 'El rol debe ser un número entero' })
    @IsNotEmpty({ message: 'El rol es requerido' })
    rolId: number;

    @IsUUID('4', { message: 'El inquilino debe ser un UUID' })
    @IsNotEmpty({ message: 'El inquilino es requerido' })
    inquilinoId: string;
}
