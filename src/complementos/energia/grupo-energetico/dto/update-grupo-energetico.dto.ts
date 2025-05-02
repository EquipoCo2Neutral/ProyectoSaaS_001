import { PartialType } from '@nestjs/mapped-types';
import { CreateGrupoEnergeticoDto } from './create-grupo-energetico.dto';

export class UpdateGrupoEnergeticoDto extends PartialType(CreateGrupoEnergeticoDto) {}
