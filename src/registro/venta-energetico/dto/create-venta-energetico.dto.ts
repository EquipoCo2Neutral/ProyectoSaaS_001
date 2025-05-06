import { IsNotEmpty, IsNumber, IsUUID } from 'class-validator';

export class CreateVentaEnergeticoDto {
  @IsNotEmpty({ message: 'debes ingresar el energético' })
  @IsNumber()
  idEnergetico: number;

  @IsNotEmpty({ message: 'debes ingresar la region' })
  @IsNumber()
  idRegion: number;

  @IsNotEmpty({ message: 'debes ingresar el sector' })
  @IsNumber()
  idSector: number;

  @IsNotEmpty({ message: 'debes ingresar el sub sector' })
  @IsNumber()
  idSubSector: number;

  @IsNotEmpty({ message: 'Debes ingresar la unidad' })
  @IsNumber()
  idUnidad: number;

  @IsNotEmpty({ message: 'Debes ingresar la cantidad' })
  @IsNumber()
  cantidad: number;

  @IsNotEmpty()
  @IsUUID()
  idMesProceso: string;
}
