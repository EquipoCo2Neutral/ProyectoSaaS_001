import { PartialType } from '@nestjs/mapped-types';
import { CreateSectorEconomicoDto } from './create-sector-economico.dto';

export class UpdateSectorEconomicoDto extends PartialType(CreateSectorEconomicoDto) {}
