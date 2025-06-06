import { IsNotEmpty, IsString } from 'class-validator';

export class CreateRegioneDto {
  @IsString()
  @IsNotEmpty({ message: 'El nombre es requerido' })
  nombre: string;

  @IsNotEmpty({ message: 'El IdPais es requerido' })
  idPais: number;
}
