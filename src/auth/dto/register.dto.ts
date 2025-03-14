import { Transform } from 'class-transformer';
import {
  IsEmail,
  IsInt,
  IsNotEmpty,
  IsString,
  IsUUID,
  MinLength,
} from 'class-validator';

export class RegisterDto {
  @IsEmail()
  @IsNotEmpty()
  correoUsuario: string;

  @Transform(({ value }) => value.trim())
  @IsString()
  @MinLength(6)
  @IsNotEmpty()
  contrasenaUsuario: string;

  @IsInt()
  rolId: number;

  @IsUUID('4', { message: 'El inquilino debe ser un UUID' })
  @IsNotEmpty()
  inquilinoId: string;
}
