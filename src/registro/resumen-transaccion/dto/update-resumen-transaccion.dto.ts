import { PartialType } from '@nestjs/mapped-types';
import { CreateResumenTransaccionDto } from './create-resumen-transaccion.dto';

export class UpdateResumenTransaccionDto extends PartialType(CreateResumenTransaccionDto) {}
