import { IsNotEmpty, IsNumber, IsString, IsUUID } from 'class-validator';

export class CreateExportacioneDto {
  @IsNotEmpty({ message: 'El energetico es requerido' })
  @IsNumber()
  idEnergetico: number;

  @IsNotEmpty({ message: 'El pais es requerido' })
  @IsNumber()
  idPais: number;

  @IsNotEmpty({ message: 'La empresa destino es requerida' })
  @IsString()
  empresaDestino: string;

  @IsNotEmpty({ message: 'La cantidad es requerida' })
  @IsNumber()
  cantidad: number;

  @IsNotEmpty({ message: 'La unidad es requerida' })
  @IsNumber()
  idUnidad: number;

  @IsNotEmpty({ message: 'El mesProceso es requerido' })
  @IsUUID()
  idMesProceso: string;
}
