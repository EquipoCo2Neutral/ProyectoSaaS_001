import { Transform } from 'class-transformer';
import {
  IsEmail,
  IsInt,
  IsNotEmpty,
  IsString,
  MinLength,
} from 'class-validator';

export class RegisterEquipoDto {
  @IsString()
  @IsNotEmpty()
  nombre: string;

  @IsString()
  @IsNotEmpty()
  apellido: string;

  @IsEmail()
  @IsNotEmpty()
  correo: string;

  @Transform(({ value }) => value.trim())
  @IsString()
  @MinLength(6)
  @IsNotEmpty()
  contrasena: string;

  @IsInt()
  rolId: number;
}
