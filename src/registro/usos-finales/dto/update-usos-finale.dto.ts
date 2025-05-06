import { PartialType } from '@nestjs/mapped-types';
import { CreateUsosFinaleDto } from './create-usos-finale.dto';

export class UpdateUsosFinaleDto extends PartialType(CreateUsosFinaleDto) {}
