import { IsNotEmpty } from "class-validator";



export class CreateResumenTransaccioneDto {

    @IsNotEmpty({ message: 'El Proceso es requerido' })
    mesProcesoId: string;

    
    Energetico: string;

    @IsNotEmpty({ message: 'La categoria es requerida' })
    Categoria: string;

    @IsNotEmpty({ message: 'La cantidad de entrada es requerida' })
    cantidadEntrada: number;

    @IsNotEmpty({ message: 'La cantidad de salida es requerida' })
    cantidadSalida: number;

    @IsNotEmpty({ message: 'La unidad es requerida' })
    Unidad: string;
    

}
