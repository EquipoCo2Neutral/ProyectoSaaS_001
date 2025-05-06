import { PartialType } from '@nestjs/mapped-types';
import { CreateSubSectorEconomicoDto } from './create-sub-sector-economico.dto';

export class UpdateSubSectorEconomicoDto extends PartialType(CreateSubSectorEconomicoDto) {}
