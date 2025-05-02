import { PartialType } from '@nestjs/mapped-types';
import { CreateAdquisicioneDto } from './create-adquisicione.dto';

export class UpdateAdquisicioneDto extends PartialType(CreateAdquisicioneDto) {}
