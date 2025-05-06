import { PartialType } from '@nestjs/mapped-types';
import { CreateCategoriaUfDto } from './create-categoria-uf.dto';

export class UpdateCategoriaUfDto extends PartialType(CreateCategoriaUfDto) {}
