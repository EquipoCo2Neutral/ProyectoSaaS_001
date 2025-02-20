import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator'; //añadido para que no se envíen campos que no estén en el DTO

export class CreateSaasAdminDto {
  @IsString({ message: 'El nombre debe ser un texto' })
  @IsNotEmpty({ message: 'El nombre es requerido' })
  name: string;
  @IsEmail({}, { message: 'El email debe ser un email' })
  @IsNotEmpty({ message: 'El email es requerido' })
  email: string;
  @IsString({ message: 'La contraseña debe ser un texto' })
  @MinLength(8)
  @IsNotEmpty()
  password: string;
}
