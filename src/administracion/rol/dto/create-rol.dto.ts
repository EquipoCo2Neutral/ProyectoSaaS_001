import { IsNotEmpty, IsString } from 'class-validator';

export class CreateRolDto {
  @IsString({ message: 'El rol debe ser un texto' })
  @IsNotEmpty({ message: 'El rol es requerido' })
  rol: string;
}
