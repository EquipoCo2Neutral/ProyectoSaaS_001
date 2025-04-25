import { PartialType } from '@nestjs/mapped-types';
import { CreateMesProcesoDto } from './create-mes-proceso.dto';

export class UpdateMesProcesoDto extends PartialType(CreateMesProcesoDto) {}
