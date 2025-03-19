import { Transform } from 'class-transformer';
import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class LoginEquipoDto {
  @IsEmail()
  correo: string;

  @IsNotEmpty()
  @Transform(({ value }) => value.trim())
  @IsString()
  @MinLength(6)
  contrasena: string;
}
