import { Transform } from 'class-transformer';
import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class LoginDto {
  @IsEmail()
  correoUsuario: string;

  @IsNotEmpty()
  @Transform(({ value }) => value.trim())
  @IsString()
  @MinLength(6)
  contrasenaUsuario: string;
}
