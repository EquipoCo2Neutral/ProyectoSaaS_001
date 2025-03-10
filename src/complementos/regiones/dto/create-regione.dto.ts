import { IsNotEmpty, IsString } from 'class-validator';

export class CreateRegioneDto {
  @IsString()
  @IsNotEmpty()
  nombre: string;

  @IsNotEmpty({ message: 'El IdPais es requerido' })
  idPais: number;
}
