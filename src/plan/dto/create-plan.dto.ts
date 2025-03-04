import { IsNotEmpty, IsString } from 'class-validator';

export class CreatePlanDto {
    @IsString({ message: 'El nombre debe ser un texto' })
    @IsNotEmpty({ message: 'El nombre es requerido' })
    nombrePlan: string;
    
    @IsNotEmpty({ message: 'La cantidad de admins es requerida' })
    cantidadAdministradores: number;
    
    @IsNotEmpty({ message: 'La cantidad de gestores es requerida' })
    cantidadGestores: number;
    
    @IsNotEmpty({ message: 'La cantidad de plantas es requerida' })
    cantidadPlantas: number;
    
    @IsNotEmpty({ message: 'La cantidad de usuarios es requerida' })
    cantidadUsuarios: number;
    
    @IsNotEmpty({ message: 'el estado es requerido' })
    estadoPlan: boolean;
}
