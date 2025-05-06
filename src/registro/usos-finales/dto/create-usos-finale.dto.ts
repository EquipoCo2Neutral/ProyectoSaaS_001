import {
  IsNotEmpty,
  IsNumber,
  IsString,
  Min,
  ValidateIf,
} from 'class-validator';

export class CreateUsosFinaleDto {
  @IsNotEmpty({ message: 'debes ingresar el energetico' })
  @IsNumber()
  idEnergetico: number;

  @IsNotEmpty({ message: 'debes ingresar la categoria ' })
  @IsNumber()
  idCategoriaUF: number;

  @ValidateIf(
    (o) =>
      o.idCategoriaUF === 1 ||
      o.idCategoriaUF === 2 ||
      o.idCategoriaUF === 3 ||
      o.idCategoriaUF === 5,
  )
  @IsNotEmpty({ message: 'debes ingresar el tipo de uso final' })
  idTipoUF: number;

  @IsNotEmpty({ message: 'debes ingresar la unidad' })
  @IsNumber()
  idUnidad: number;

  @IsNotEmpty({ message: 'debes ingresar la cantidad' })
  @IsNumber()
  @Min(0, { message: 'La cantidad no puede ser menor que 0' })
  cantidad: number;

  @ValidateIf((o) => o.idCategoriaUF === 1)
  @IsNotEmpty({ message: 'debes ingresar el tipo' })
  tipo: string;

  @ValidateIf((o) => o.idTipoUF === 11 || o.idTipoUF === 14)
  @IsNotEmpty({ message: 'debes ingresar el detalle' })
  detalle: string;

  @IsNotEmpty({ message: 'MesProceso invalido' })
  @IsString()
  idMesProceso: string;
}
