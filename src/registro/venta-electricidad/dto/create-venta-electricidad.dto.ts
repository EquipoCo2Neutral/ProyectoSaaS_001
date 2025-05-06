import {
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsUUID,
  Min,
  ValidateIf,
} from 'class-validator';

export class CreateVentaElectricidadDto {
  @IsNotEmpty({ message: 'debes ingresar el destino de venta' })
  @IsNumber()
  idDestinoVenta: number;

  @ValidateIf((o) => o.idDestinoVenta === 1)
  @IsNotEmpty()
  @IsBoolean()
  ventaMercadoSpot: boolean;

  @ValidateIf((o) => o.idDestinoVenta === 4)
  empresaDestino: string;

  @ValidateIf((o) => o.idDestinoVenta === 3 || o.idDestinoVenta === 4)
  @IsNotEmpty()
  @IsNumber()
  idRegion: number;

  @ValidateIf((o) => o.idDestinoVenta === 3 || o.idDestinoVenta === 4)
  @IsNotEmpty()
  @IsNumber()
  idSectorEconomico: number;
  @ValidateIf((o) => o.idDestinoVenta === 3 || o.idDestinoVenta === 4)
  @IsNotEmpty()
  @IsNumber()
  idSubSectorEconomico: number;

  @IsNotEmpty({ message: 'la cantidad es requerida' })
  @IsNumber()
  @Min(0, { message: 'La cantidad no puede ser menor que 0' })
  cantidadVendida: number;

  @IsNotEmpty({ message: 'La unidad es requerida' })
  @IsNumber()
  idUnidad: number;

  @IsNotEmpty()
  @IsUUID()
  idMesProceso: string;
}
