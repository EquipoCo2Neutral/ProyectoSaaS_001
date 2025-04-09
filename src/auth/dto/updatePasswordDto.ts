import { IsNotEmpty, IsString } from 'class-validator';

export class UpdatePasswordDto {
  @IsNotEmpty()
  @IsString()
  contrasenaUsuario: string;
}
