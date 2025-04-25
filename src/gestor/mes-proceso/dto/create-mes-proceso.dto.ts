import { IsBoolean, IsNotEmpty, IsNumber, IsUUID } from 'class-validator';

export class CreateMesProcesoDto {
  @IsNotEmpty({ message: 'El mes es requerido' })
  @IsNumber()
  idMes: number;

  @IsNotEmpty({ message: 'El IdProceso es requerido' })
  @IsUUID('4', { message: 'El IdProceso debe ser un UUID' })
  idProceso: string;

  @IsNotEmpty({ message: 'El estado es requerido' })
  @IsBoolean()
  estado: boolean = false;
}
