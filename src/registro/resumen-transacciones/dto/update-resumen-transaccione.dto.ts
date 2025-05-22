import { PartialType } from '@nestjs/mapped-types';
import { CreateResumenTransaccioneDto } from './create-resumen-transaccione.dto';

export class UpdateResumenTransaccioneDto extends PartialType(CreateResumenTransaccioneDto) {}
