import { PartialType } from '@nestjs/mapped-types';
import { CreateEquipoSaassDto } from './create-equipo-saass.dto';

export class UpdateEquipoSaassDto extends PartialType(CreateEquipoSaassDto) {}
