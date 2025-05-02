import { PartialType } from '@nestjs/mapped-types';
import { CreateEnergeticoDto } from './create-energetico.dto';

export class UpdateEnergeticoDto extends PartialType(CreateEnergeticoDto) {}
