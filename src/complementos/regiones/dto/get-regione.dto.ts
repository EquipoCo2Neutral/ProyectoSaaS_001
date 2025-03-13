import { IsNumberString, IsOptional } from 'class-validator';

export class GetRegioneQueryDto {
  @IsOptional()
  @IsNumberString({}, { message: 'El id de la region debe ser un numero' })
  pais_id?: number;
}
