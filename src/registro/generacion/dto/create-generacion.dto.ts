import { IsNotEmpty, IsOptional, IsString, IsUUID, ValidateIf } from "class-validator";



export class CreateGeneracionDto {

    @IsNotEmpty({message:'El Proceso es requerido'})
    idMesProceso: string;

    @IsNotEmpty({message:'La tecnologia es requerida'})
    idTecnologia: number;


    @IsNotEmpty({message:'La unidad de cantidad generada bruta es requerida'})
    idUnidad_CGB: number;

    @IsNotEmpty({message:'La unidad de capacidad instalada es requerida'})
    idUnidad_Ci: number;


    @IsNotEmpty({message:'La cantidad generada bruta es requerida'})
    cantidadGeneradaBruta: number;


    @IsNotEmpty({message:'La capacidad instalada es requerida'})
    capacidadInstalada: number;


    @ValidateIf((o)=> o.idTecnologia === 1 || o.idTecnologia === 2 || o.idTecnologia === 3 )
    @IsNotEmpty({message:'La unidad de cantidad cantidad de energia no aprovechada es requerida'})
    idUnidad_Cena?: number | null;

    @ValidateIf((o)=> o.idTecnologia === 4 )
    @IsNotEmpty({message:'La unidad de consumo energetico es requerido'})
    idUnidad_Ce?: number | null;

    @ValidateIf((o)=> o.idTecnologia === 4 )
    @IsNotEmpty({message:'El id energetico es requerido'})
    idEnergetico?: number | null;

    @ValidateIf((o)=> o.idTecnologia === 4 )
    @IsNotEmpty({message:'El consumo energetico es requerido'})
    consumoEnergetico?: number | null;

    @ValidateIf((o)=> o.idTecnologia === 1 || o.idTecnologia === 2 || o.idTecnologia === 3 )
    @IsNotEmpty({message:'La cantidad de energia no aprovechada es requerida'})
    cantidadEnergiaNoAprovechada?: number | null;

    @IsOptional({message:'Las observaciones son un string'})
    @IsString({message:'Las observaciones son un string'})
    Observaciones?: string | null;


    @ValidateIf((o)=> o.idTecnologia === 3 || o.idTecnologia === 4)
    @IsNotEmpty({message:'El tipo es requerido'})
    Tipo?: string | null;


}
