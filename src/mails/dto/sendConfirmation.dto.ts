import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class SendConfirmationDto {
  @IsNotEmpty()
  @IsString()
  token: string;

  @IsNotEmpty()
  @IsEmail()
  correoUsuario: string;
}
