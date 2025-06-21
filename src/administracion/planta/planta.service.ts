import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePlantaDto } from './dto/create-planta.dto';
import { UpdatePlantaDto } from './dto/update-planta.dto';
import { Planta } from './entities/planta.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Usuario } from '../usuario/entities/usuario.entity';
import { Inquilino } from '../inquilino/entities/inquilino.entity';
import { Comuna } from 'src/complementos/comunas/entities/comuna.entity';
import { Proceso } from 'src/gestor/proceso/entities/proceso.entity';
import { MesProceso } from 'src/gestor/mes-proceso/entities/mes-proceso.entity';
import { Adquisicione } from 'src/registro/adquisiciones/entities/adquisicione.entity';
import { Generacion } from 'src/registro/generacion/entities/generacion.entity';
import { Transformacione } from 'src/registro/transformaciones/entities/transformacione.entity';
import { UsosFinale } from 'src/registro/usos-finales/entities/usos-finale.entity';
import { VentaElectricidad } from 'src/registro/venta-electricidad/entities/venta-electricidad.entity';
import { VentaEnergetico } from 'src/registro/venta-energetico/entities/venta-energetico.entity';
import { Exportacione } from 'src/registro/exportaciones/entities/exportacione.entity';
import { ResumenTransaccion } from 'src/registro/resumen-transaccion/entities/resumen-transaccion.entity';

@Injectable()
export class PlantaService {
  constructor(
    @InjectRepository(Planta)
    private plantaRepository: Repository<Planta>,
    @InjectRepository(Usuario)
    private usuarioRepository: Repository<Usuario>,
    @InjectRepository(Inquilino)
    private inquilinoRepository: Repository<Inquilino>,
    @InjectRepository(Comuna)
    private comunaRepository: Repository<Comuna>,
    @InjectRepository(Proceso)
    private readonly procesoRepository: Repository<Proceso>,
    @InjectRepository(MesProceso)
    private readonly mesProcesoRepository: Repository<MesProceso>,
    @InjectRepository(Adquisicione)
    private readonly adquisicionRepository: Repository<Adquisicione>,
    @InjectRepository(Generacion)
    private readonly generacionRepository: Repository<Generacion>,
    @InjectRepository(Transformacione)
    private readonly transformacionRepository: Repository<Transformacione>,
    @InjectRepository(UsosFinale)
    private readonly usoFinalRepository: Repository<UsosFinale>,
    @InjectRepository(VentaElectricidad)
    private readonly ventaElectricidadRepository: Repository<VentaElectricidad>,
    @InjectRepository(VentaEnergetico)
    private readonly ventaEnergeticoRepository: Repository<VentaEnergetico>,
    @InjectRepository(Exportacione)
    private readonly exportacionRepository: Repository<Exportacione>,
    @InjectRepository(ResumenTransaccion)
    private readonly resumenTransaccionRepository: Repository<ResumenTransaccion>,
  ) {}

  async findByInquilino(inquilinoId: string) {
    const plantas = await this.plantaRepository.find({
      where: {
        inquilino: { inquilinoId },
      },
      relations: [
        'comuna',
        'usuario',
        'usuario.personas',
        'procesos',
        'inquilino',
      ],
    });

    return plantas.map((planta) => ({
      idPlanta: planta.idPlanta,
      nombre: planta.nombre,
      direccion: planta.direccion,
      estado: planta.estado,
      usuarioId: planta.usuario ? planta.usuario.usuarioId : null,
      usuario: planta.usuario.personas,
      inquilinoId: planta.inquilino.inquilinoId,
      comunaId: planta.comuna.idComuna,
      procesos: planta.procesos.map((proceso) => ({
        idProceso: proceso.idProceso,
        año: proceso.año_proceso,
        estado: proceso.estado,
      })),
    }));
  }

  async create(createPlantaDto: CreatePlantaDto) {
    const usuario = await this.usuarioRepository.findOneBy({
      usuarioId: createPlantaDto.usuarioId,
    });
    const inquilino = await this.inquilinoRepository.findOneBy({
      inquilinoId: createPlantaDto.inquilinoId,
    });
    const comuna = await this.comunaRepository.findOneBy({
      idComuna: createPlantaDto.comunaId,
    });

    if (!usuario) {
      let errors: string[] = [];
      errors.push('El usuario no existe');
      throw new NotFoundException(errors);
    }
    if (!inquilino) {
      let errors: string[] = [];
      errors.push('El inquilino no existe');
      throw new NotFoundException(errors);
    }
    if (!comuna) {
      let errors: string[] = [];
      errors.push('La comuna no existe');
      throw new NotFoundException(errors);
    }

    return this.plantaRepository.save({
      ...createPlantaDto,
      usuario,
      inquilino,
      comuna,
      message: 'Planta creada correctamente',
    });
  }

  async findAll() {
    return await this.plantaRepository.find();
  }

  async findOne(id: string) {
    const planta = await this.plantaRepository.findOne({
      where: { idPlanta: id },
      relations: [
        'usuario',
        'inquilino',
        'comuna',
        'comuna.region',
        'comuna.region.pais',
      ],
    });

    if (!planta) {
      let errors: string[] = [];
      errors.push('La planta no existe');
      throw new NotFoundException(errors);
    }

    return planta;
  }

  async update(id: string, updatePlantaDto: UpdatePlantaDto) {
    const planta = await this.findOne(id);
    Object.assign(planta, updatePlantaDto);

    if (updatePlantaDto.usuarioId) {
      const usuario = await this.usuarioRepository.findOneBy({
        usuarioId: updatePlantaDto.usuarioId,
      });

      if (!usuario) {
        let errors: string[] = [];
        errors.push('El usuario no existe');
        throw new NotFoundException(errors);
      }

      planta.usuario = usuario;
    }
    if (updatePlantaDto.inquilinoId) {
      const inquilino = await this.inquilinoRepository.findOneBy({
        inquilinoId: updatePlantaDto.inquilinoId,
      });

      if (!inquilino) {
        let errors: string[] = [];
        errors.push('El inquilino no existe');
        throw new NotFoundException(errors);
      }

      planta.inquilino = inquilino;
    }
    if (updatePlantaDto.comunaId) {
      const comuna = await this.comunaRepository.findOneBy({
        idComuna: updatePlantaDto.comunaId,
      });

      if (!comuna) {
        let errors: string[] = [];
        errors.push('La comuna no existe');
        throw new NotFoundException(errors);
      }

      planta.comuna = comuna;
    }

    const resultado = await this.plantaRepository.save(planta);
    return {
      resultado,
      message: 'Planta actualizada correctamente',
    };
  }

  async remove(id: string) {
    const planta = await this.plantaRepository.findOne({
      where: { idPlanta: id },
      relations: [
        'procesos',
        'procesos.mesesProceso',
        'procesos.mesesProceso.adquisiciones',
        'procesos.mesesProceso.generacion',
        'procesos.mesesProceso.transformacion',
        'procesos.mesesProceso.usoFinal',
        'procesos.mesesProceso.ventaElectricidad',
        'procesos.mesesProceso.ventaEnergetico',
        'procesos.mesesProceso.exportacion',
        'procesos.resumenTransaccion',
      ],
    });

    if (!planta) throw new NotFoundException('Planta no encontrada');

    for (const proceso of planta.procesos) {
      for (const mes of proceso.mesesProceso) {
        // 👇 PRIMERO borra resumenTransaccion que depende de mesProceso
        await this.resumenTransaccionRepository.delete({
          mesProceso: { idMesProceso: mes.idMesProceso },
        });

        // 👇 Luego borra registros energéticos del mes
        await this.adquisicionRepository.delete({
          mesProceso: { idMesProceso: mes.idMesProceso },
        });
        await this.generacionRepository.delete({
          mesProceso: { idMesProceso: mes.idMesProceso },
        });
        await this.transformacionRepository.delete({
          mesProceso: { idMesProceso: mes.idMesProceso },
        });
        await this.usoFinalRepository.delete({
          mesProceso: { idMesProceso: mes.idMesProceso },
        });
        await this.ventaElectricidadRepository.delete({
          mesProceso: { idMesProceso: mes.idMesProceso },
        });
        await this.ventaEnergeticoRepository.delete({
          mesProceso: { idMesProceso: mes.idMesProceso },
        });
        await this.exportacionRepository.delete({
          mesProceso: { idMesProceso: mes.idMesProceso },
        });

        // 👇 Finalmente borra el mes
        await this.mesProcesoRepository.delete({
          idMesProceso: mes.idMesProceso,
        });
      }

      // 👇 Luego borra resumenTransaccion directamente relacionado al proceso
      await this.resumenTransaccionRepository.delete({
        proceso: { idProceso: proceso.idProceso },
      });

      // 👇 Luego borra el proceso
      await this.procesoRepository.delete({ idProceso: proceso.idProceso });
    }

    // 👇 Finalmente borra resumenTransaccion relacionados directamente con la planta (si existiera alguno)
    await this.resumenTransaccionRepository.delete({
      planta: { idPlanta: planta.idPlanta },
    });

    // 👇 Y finalmente borra la planta
    const resultado = await this.plantaRepository.delete({
      idPlanta: planta.idPlanta,
    });

    return {
      resultado,
      message: "'La planta y todos sus datos asociados han sido eliminados'",
    };
  }

  async findByUsuario(correo: string) {
    const usuarioCorreo = await this.usuarioRepository.findOne({
      where: { correoUsuario: correo },
    });
    if (usuarioCorreo) {
      const planta = await this.plantaRepository.find({
        where: { usuario: { usuarioId: usuarioCorreo.usuarioId } },
        relations: { usuario: true, inquilino: true, comuna: true },
      });
      return planta;
    }
    return null;
  }
}
