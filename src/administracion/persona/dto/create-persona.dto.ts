import { IsNotEmpty, IsString } from 'class-validator';

export class CreatePersonaDto {
  @IsNotEmpty({ message: 'El rut es requerido' })
  rut: number;
  @IsString({ message: 'El nombre debe ser un texto' })
  @IsNotEmpty({ message: 'El nombre es requerido' })
  nombre: string;
  @IsString({ message: 'El primer apellido debe ser un texto' })
  @IsNotEmpty({ message: 'El primer apellido es requerido' })
  primerApellido: string;
  @IsString({ message: 'El segundo apellido debe ser un texto' })
  @IsNotEmpty({ message: 'El segundo apellido es requerido' })
  segundoApellido: string;
  @IsNotEmpty({ message: 'El telefono es requerido' })
  telefono: number;

  @IsNotEmpty({ message: 'El usuarioId es requerido' })
  usuarioId: string;

}
