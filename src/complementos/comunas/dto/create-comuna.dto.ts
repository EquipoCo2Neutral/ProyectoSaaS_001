import { IsNotEmpty, IsString } from 'class-validator';

export class CreateComunaDto {
  @IsString()
  @IsNotEmpty({ message: 'El nombre es requerido' })
  nombre: string;
  regionId: number;

  @IsNotEmpty({ message: 'El IdRegion es requerido' })
  idRegion: number;
}
