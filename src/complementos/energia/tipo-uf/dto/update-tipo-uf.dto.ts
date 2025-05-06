import { PartialType } from '@nestjs/mapped-types';
import { CreateTipoUfDto } from './create-tipo-uf.dto';

export class UpdateTipoUfDto extends PartialType(CreateTipoUfDto) {}
