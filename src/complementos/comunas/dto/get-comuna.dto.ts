import { IsNumberString, IsOptional } from 'class-validator';

export class GetComunaQueryDto {
  @IsOptional()
  @IsNumberString({}, { message: 'El id de la comuna debe ser un numero' })
  region_id?: number;
}
