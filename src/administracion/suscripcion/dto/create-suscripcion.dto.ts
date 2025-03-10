import { IsInt, IsNotEmpty, IsString } from 'class-validator';

export class CreateSuscripcionDto {
    @IsNotEmpty({ message: 'El estado es requerido' })
    estado: boolean;
    @IsNotEmpty({ message: 'los dias activos son requeridos' })
    @IsInt({ message: 'Los días activos deben ser un número entero' })
    diasActivo: number;
    
    @IsNotEmpty({ message: 'El planId es requerido' })
    planId: number;


}
