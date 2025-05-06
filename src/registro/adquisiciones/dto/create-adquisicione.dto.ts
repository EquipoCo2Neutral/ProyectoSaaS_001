import {
  IsBoolean,
  IsEmpty,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Max,
  Min,
  ValidateIf,
} from 'class-validator';

export class CreateAdquisicioneDto {
  @IsNotEmpty({ message: 'El Proceso es requerido' })
  idMesProceso: string;

  @IsNotEmpty({ message: 'La transaccion es requerida' })
  idTransaccion: number;

  @IsNotEmpty({ message: 'El grupo energetico es requerido' })
  idGrupoEnergetico: number;

  @IsNotEmpty({ message: 'El energetico es requerido' })
  idEnergetico: number;

  @IsNotEmpty({ message: 'La unidad es requerida' })
  idUnidad: number;

  @ValidateIf((o) => o.idTransaccion === 2)
  @IsNotEmpty({ message: 'El pais origen es requerido' })
  idPaisOrigen?: number | null;

  @IsNotEmpty({ message: 'La cantidad es requerida' })
  @IsNumber()
  @Min(0, { message: 'La cantidad no puede ser menor que 0' })
  Cantidad: number;

  @ValidateIf((o) => o.idTransaccion === 3)
  @IsNotEmpty({ message: 'La cantidad inicial es requerida' })
  @Min(0, { message: 'La cantidad no puede ser menor que 0' })
  cantidadInicial?: number | null;

  @ValidateIf((o) => o.idTransaccion === 3)
  @IsNotEmpty({ message: 'La cantidad final es requerida' })
  @Min(0, { message: 'La cantidad no puede ser menor que 0' })
  cantidadFinal?: number | null;

  @IsOptional({ message: 'La empresaOrigen es un string' })
  empresaOrigen?: string | null;

  @IsOptional({ message: 'El poder calorifico es un número' })
  @Min(0, { message: 'La cantidad no puede ser menor que 0' })
  poderCalorifico?: number | null;

  @IsOptional({ message: 'El porcentaje humedad es un número del 0 a 100' })
  @Min(0, { message: 'La cantidad no puede ser menor que 0' })
  @Max(100, { message: 'El porcentaje de humedad no puede ser mayor que 100' })
  porcentajeHumedad?: number | null;

  @ValidateIf((o) => o.idTransaccion === 1 && o.idEnergetico === 43)
  @IsBoolean({ message: 'El campo compraMercadoSpot es un booleano' })
  compraMercadoSpot?: boolean;
}
