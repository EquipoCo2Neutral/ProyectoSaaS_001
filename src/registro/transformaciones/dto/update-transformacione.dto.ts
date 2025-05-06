import { PartialType } from '@nestjs/mapped-types';
import { CreateTransformacioneDto } from './create-transformacione.dto';

export class UpdateTransformacioneDto extends PartialType(CreateTransformacioneDto) {}
