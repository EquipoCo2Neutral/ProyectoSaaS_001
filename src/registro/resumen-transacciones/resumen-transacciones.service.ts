import { Injectable } from '@nestjs/common';
import { CreateResumenTransaccioneDto } from './dto/create-resumen-transaccione.dto';
import { UpdateResumenTransaccioneDto } from './dto/update-resumen-transaccione.dto';
import { Repository } from 'typeorm';
import { ResumenTransaccione } from './entities/resumen-transaccione.entity';
import { MesProceso } from 'src/gestor/mes-proceso/entities/mes-proceso.entity';
import { Adquisicione } from '../adquisiciones/entities/adquisicione.entity';
import { Generacion } from '../generacion/entities/generacion.entity';
import { Transformacione } from '../transformaciones/entities/transformacione.entity';
import { UsosFinale } from '../usos-finales/entities/usos-finale.entity';
import { VentaElectricidad } from '../venta-electricidad/entities/venta-electricidad.entity';
import { VentaEnergetico } from '../venta-energetico/entities/venta-energetico.entity';
import { Exportacione } from '../exportaciones/entities/exportacione.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class ResumenTransaccionesService {

  constructor(
    @InjectRepository(ResumenTransaccione)
    private readonly resumenTransaccioneRepository: Repository<ResumenTransaccione>,
    @InjectRepository(MesProceso)
    private readonly mesProcesoRepository: Repository<MesProceso>,
    @InjectRepository(Adquisicione)
    private readonly adquisicioneRepository: Repository<Adquisicione>,
    @InjectRepository(Generacion)
    private readonly generacionRepository: Repository<Generacion>,
    @InjectRepository(Transformacione)
    private readonly transformacioneRepository: Repository<Transformacione>,
    @InjectRepository(UsosFinale)
    private readonly usosFinaleRepository: Repository<UsosFinale>,
    @InjectRepository(VentaElectricidad)
    private readonly ventaElectricidadRepository: Repository<VentaElectricidad>,
    @InjectRepository(VentaEnergetico)
    private readonly ventaEnergeticoRepository: Repository<VentaEnergetico>,
    @InjectRepository(Exportacione)
    private readonly exportacioneRepository: Repository<Exportacione>,
  ) {}



  async createResumenTransaccione(mes:string) {
    const mesProceso = await this.mesProcesoRepository.findOne({
      where: { idMesProceso: mes },
    });

    if (!mesProceso) {
      throw new Error('MesProceso not found');
    }
    await this.resumenTransaccioneRepository.delete({ mesProceso });
    // 2. Obtener datos en paralelo para mejor rendimiento
    const [
      adquisiciones,
      generacion,
      transformacion,
      usoFinal,
      ventaElectricidad,
      ventaEnergetico,
      exportaciones,
    ] = await Promise.all([
      this.adquisicioneRepository.find({
        where: { mesProceso },
        relations: ['energetico', 'transaccion', 'unidad'],
      }),
      this.generacionRepository.find({
        where: { mesProceso },
        relations: ['energetico', 'unidadCGB'],
      }),
      this.transformacioneRepository.find({
        where: { mesProceso },
        relations: ['energetico', 'unidad'],
      }),
      this.usosFinaleRepository.find({
        where: { mesProceso },
        relations: ['energetico', 'unidad', 'categoriaUF'],
      }),
      this.ventaElectricidadRepository.find({
        where: { mesProceso },
        relations: ['unidad'],
      }),
      this.ventaEnergeticoRepository.find({
        where: { mesProceso },
        relations: ['energetico', 'unidad'],
      }),
      this.exportacioneRepository.find({
        where: { mesProceso },
        relations: ['energetico', 'unidad'],
      }),
    ]);

    // 3. Crear mapa para consolidar la información
    const resumenTransacciones: Partial<ResumenTransaccione>[] = [];

    // Ejemplo para adquisiciones (entradas)
    adquisiciones.forEach(adq => {
      resumenTransacciones.push({
        Energetico: adq.energetico.nombreEnergetico,
        Categoria: adq.transaccion.nombreTransaccion,
        Unidad: adq.unidad.nombreUnidad,
        cantidadEntrada: adq.Cantidad,
        cantidadSalida: 0,
        mesProceso: mesProceso,
      });
    });

    generacion.forEach(adq => {
      let categoriaGeneracion: string;
      let energeticoGeneracion: string;
      let cantidadEntrada: number;
      let cantidadSalida: number;

      // Definir categoría
      if ([1, 2, 3].includes(adq.idTecnologia)) {
        categoriaGeneracion = 'Generación Energía Renovable';
      } else if ([4, 5].includes(adq.idTecnologia)) {
        categoriaGeneracion = 'Generación Eléctrica Termica';
      } else {
        categoriaGeneracion = 'Generación'; // valor por defecto
      }

      // Definir energético
      if ([1, 2, 3, 5].includes(adq.idTecnologia)) {
        energeticoGeneracion = 'Electricidad';
      } else if (adq.idTecnologia === 4) {
        energeticoGeneracion = adq.energetico?.nombreEnergetico?.trim() || 'Desconocido';
      } else {
        energeticoGeneracion = 'Desconocido';
      }

      // Definir cantidad de entrada y salida
      cantidadEntrada = [1, 2, 3, 5].includes(adq.idTecnologia) ? adq.cantidadGeneradaBruta : 0;
      cantidadSalida = adq.idTecnologia === 4 ? adq.cantidadGeneradaBruta : 0;

      resumenTransacciones.push({
        Energetico: energeticoGeneracion,
        Categoria: categoriaGeneracion,
        Unidad: adq.unidadCGB.nombreUnidad,
        cantidadEntrada: cantidadEntrada,
        cantidadSalida: cantidadSalida,
        mesProceso: mesProceso,
      });
    });


    // Ejemplo para usos finales (salidas)
    
    transformacion.forEach(uf => {
      resumenTransacciones.push({
        Energetico: uf.energetico.nombreEnergetico,
        Categoria: 'Transformación',
        Unidad: uf.unidad.nombreUnidad,
        cantidadEntrada: 0,
        cantidadSalida: uf.cantidad,
        mesProceso: mesProceso,
      });
    });



    usoFinal.forEach(uf => {
      resumenTransacciones.push({
        Energetico: uf.energetico.nombreEnergetico,
        Categoria: uf.categoriaUF.nombreCategoria,
        Unidad: uf.unidad.nombreUnidad,
        cantidadEntrada: 0,
        cantidadSalida: uf.cantidad,
        mesProceso: mesProceso,
      });
    });

    ventaElectricidad.forEach(uf => {
      let categoriaVentaElectricidad: string;


      // Definir categoría
      if(uf.idDestinoVenta === 1){
        categoriaVentaElectricidad = 'Venta a generación eléctrica'
      } else if (uf.idDestinoVenta === 2){
        categoriaVentaElectricidad = 'Venta a distribución eléctrica'
      } else if(uf.idDestinoVenta===3){
        categoriaVentaElectricidad = 'Venta regulada'
      } else if(uf.idDestinoVenta===4){
        categoriaVentaElectricidad = 'Venta no regulada'
      } else {
        categoriaVentaElectricidad = 'Venta electrica'
      }
      resumenTransacciones.push({
        Energetico: 'Electricidad',
        Categoria: categoriaVentaElectricidad,
        Unidad: uf.unidad.nombreUnidad,
        cantidadEntrada: 0,
        cantidadSalida: uf.cantidadVendida,
        mesProceso: mesProceso,
      });
    });

    ventaEnergetico.forEach(uf => {
      resumenTransacciones.push({
        Energetico: uf.energetico.nombreEnergetico,
        Categoria: 'Venta',
        Unidad: uf.unidad.nombreUnidad,
        cantidadEntrada: 0,
        cantidadSalida: uf.cantidad,
        mesProceso: mesProceso,
      });
    });

    exportaciones.forEach(uf => {
      resumenTransacciones.push({
        Energetico: uf.energetico.nombreEnergetico,
        Categoria: 'Exportación',
        Unidad: uf.unidad.nombreUnidad,
        cantidadEntrada: 0,
        cantidadSalida: uf.cantidad,
        mesProceso: mesProceso,
      });
    });

    await this.resumenTransaccioneRepository.save(resumenTransacciones);
    // Guardar todos los resúmenes
    return resumenTransacciones;

  }
  
  create(createResumenTransaccioneDto: CreateResumenTransaccioneDto) {
    return 'This action adds a new resumenTransaccione';
  }

  findAll() {
    return `This action returns all resumenTransacciones`;
  }

  findOne(id: number) {
    return `This action returns a #${id} resumenTransaccione`;
  }

  update(id: number, updateResumenTransaccioneDto: UpdateResumenTransaccioneDto) {
    return `This action updates a #${id} resumenTransaccione`;
  }

  remove(id: number) {
    return `This action removes a #${id} resumenTransaccione`;
  }
}
