import { IsBoolean, IsNotEmpty, IsNumber, IsUUID, Min } from 'class-validator';

export class CreateProcesoDto {
  @IsNotEmpty({ message: 'El año es requerido' })
  @IsNumber()
  @Min(2020, { message: 'El año debe ser mayor a 2020' })
  año_proceso: number;

  @IsNotEmpty({ message: 'El IdPlanta es requerido' })
  @IsUUID('4', { message: 'El IdPlanta debe ser un UUID' })
  idPlanta: string;

  @IsNotEmpty({ message: 'El estado es requerido' })
  @IsBoolean()
  estado: boolean = false;
}
