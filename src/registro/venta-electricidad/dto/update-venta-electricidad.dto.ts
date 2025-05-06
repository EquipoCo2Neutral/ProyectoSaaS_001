import { PartialType } from '@nestjs/mapped-types';
import { CreateVentaElectricidadDto } from './create-venta-electricidad.dto';

export class UpdateVentaElectricidadDto extends PartialType(CreateVentaElectricidadDto) {}
