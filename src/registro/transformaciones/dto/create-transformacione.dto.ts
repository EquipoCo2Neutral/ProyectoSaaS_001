import { IsNotEmpty, IsNumber, IsString, Min } from 'class-validator';

export class CreateTransformacioneDto {
  @IsNotEmpty({ message: 'El energetico no puede ser nulo' })
  @IsNumber()
  idEnergetico: number;

  @IsNotEmpty({ message: 'se debe ingresar la cantidad' })
  @IsNumber()
  @Min(0, { message: 'La cantidad no puede ser menor que 0' })
  cantidad: number;

  @IsNotEmpty({ message: 'se debe ingresar la unidad' })
  @IsNumber()
  idUnidad: number;

  @IsNotEmpty({ message: 'se debe ingresar el energético producido' })
  @IsNumber()
  idEnergeticoProducido: number;

  @IsNotEmpty({ message: 'El mesProceso es requerido' })
  @IsString()
  idMesProceso: string;
}
