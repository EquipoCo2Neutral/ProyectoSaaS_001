import { PartialType } from '@nestjs/mapped-types';
import { CreateExportacioneDto } from './create-exportacione.dto';

export class UpdateExportacioneDto extends PartialType(CreateExportacioneDto) {}
