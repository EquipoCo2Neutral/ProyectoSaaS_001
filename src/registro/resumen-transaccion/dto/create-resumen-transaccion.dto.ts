import { IsNumber, IsNotEmpty } from 'class-validator';

export class CreateResumenTransaccionDto {
  @IsNotEmpty()
  @IsNumber()
  idEnergetico: number;

  @IsNotEmpty()
  @IsNumber()
  idCategoriaRegistro: number;

  @IsNotEmpty()
  @IsNumber()
  cantidadEntrada: number;

  @IsNotEmpty()
  @IsNumber()
  cantidadSalida: number;

  @IsNotEmpty()
  @IsNumber()
  idUnidad: number;

  @IsNotEmpty()
  @IsNumber()
  idUnidadOriginal: number;

  @IsNotEmpty()
  idMesProceso: string;

  @IsNotEmpty()
  @IsNumber()
  idProceso: string;

  @IsNotEmpty()
  @IsNumber()
  idPlanta: string;

  @IsNotEmpty()
  @IsNumber()
  inquilinoId: string;

  @IsNotEmpty()
  @IsNumber()
  cantidadGeneral: number;

  @IsNotEmpty()
  @IsNumber()
  teraCalorias: number;
}
