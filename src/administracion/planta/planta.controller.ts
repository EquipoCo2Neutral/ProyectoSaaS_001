import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  NotFoundException,
  Request,
} from '@nestjs/common';
import { PlantaService } from './planta.service';
import { CreatePlantaDto } from './dto/create-planta.dto';
import { UpdatePlantaDto } from './dto/update-planta.dto';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { Role } from 'src/common/enums/rol.enum';

@Controller('planta')
export class PlantaController {
  constructor(private readonly plantaService: PlantaService) {}

  @Post()
  create(@Body() createPlantaDto: CreatePlantaDto) {
    return this.plantaService.create(createPlantaDto);
  }

  @Get()
  findAll() {
    return this.plantaService.findAll();
  }

  //para validar que pertenezca al inquilino->vista admin inquilino
  @Auth(Role.ADMIN_INQUILINO, Role.GESTOR)
  @Get(':id')
  findOne(@Param('id') id: string, @Request() req) {
    const inquilinoId = req.user.inquilinoId;
    return this.plantaService.findOne(id, inquilinoId);
  }

  //para validar que pertenezca al inquilino->vista gestor
  @Auth(Role.GESTOR)
  @Get(':id/validacion')
  findOneValidacion(@Param('id') id: string, @Request() req) {
    const inquilinoId = req.user.inquilinoId;
    return this.plantaService.findOneValidacion(id, inquilinoId);
  }

  @Auth(Role.ADMIN_INQUILINO)
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Request() req,
    @Body() updatePlantaDto: UpdatePlantaDto,
  ) {
    const inquilinoId = req.user.inquilinoId;
    return this.plantaService.update(id, inquilinoId, updatePlantaDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.plantaService.remove(id);
  }

  @Get('inquilino/:inquilinoId')
  findByInquilino(@Param('inquilinoId') inquilinoId: string) {
    return this.plantaService.findByInquilino(inquilinoId);
  }

  @Get('usuario/:correo')
  async obtenerPlantaPorUsuario(@Param('correo') correo: string) {
    const planta = await this.plantaService.findByUsuario(correo);
    if (!planta) {
      throw new NotFoundException('No se encontró una planta para ese usuario');
    }
    return planta;
  }
}
