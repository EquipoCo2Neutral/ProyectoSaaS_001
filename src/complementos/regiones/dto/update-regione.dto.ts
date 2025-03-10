import { PartialType } from '@nestjs/mapped-types';
import { CreateRegioneDto } from './create-regione.dto';

export class UpdateRegioneDto extends PartialType(CreateRegioneDto) {}
