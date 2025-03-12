import { PartialType } from '@nestjs/mapped-types';
import { CreatePaiseDto } from './create-paise.dto';
import { IsNotEmpty, IsString } from 'class-validator';

export class UpdatePaiseDto extends PartialType(CreatePaiseDto) {
  @IsString()
  @IsNotEmpty({ message: 'El nombre es requerido' })
  nombre: string;
}
