import { PartialType } from '@nestjs/mapped-types';
import { CreateCategoriaRegistroDto } from './create-categoria-registro.dto';

export class UpdateCategoriaRegistroDto extends PartialType(CreateCategoriaRegistroDto) {}
