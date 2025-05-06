import { PartialType } from '@nestjs/mapped-types';
import { CreateVentaEnergeticoDto } from './create-venta-energetico.dto';

export class UpdateVentaEnergeticoDto extends PartialType(CreateVentaEnergeticoDto) {}
