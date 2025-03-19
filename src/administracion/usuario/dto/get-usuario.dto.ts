import {IsNumberString, IsOptional, IsString} from 'class-validator';


export class GetUsuarioDto {

    @IsOptional()
    @IsString({ message: 'el id de inquilino debe ser string'})
    inquilinoId?: string;

    @IsOptional()
    @IsNumberString({}, { message: 'El rol debe ser un número entero' })
    rolId?: number;

}
