import { IsNotEmpty, IsString } from 'class-validator';
import { Role } from 'src/common/enums/rol.enum';

export class CreateRolDto {
  @IsString({ message: 'El rol debe ser un texto' })
  @IsNotEmpty({ message: 'El rol es requerido' })
  rol: Role;
}
