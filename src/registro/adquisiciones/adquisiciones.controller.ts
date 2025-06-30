import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Request,
} from '@nestjs/common';
import { AdquisicionesService } from './adquisiciones.service';
import { CreateAdquisicioneDto } from './dto/create-adquisicione.dto';
import { UpdateAdquisicioneDto } from './dto/update-adquisicione.dto';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { Role } from 'src/common/enums/rol.enum';

@Auth(Role.GESTOR)
@Controller('adquisiciones')
export class AdquisicionesController {
  constructor(private readonly adquisicionesService: AdquisicionesService) {}

  @Post()
  create(@Body() createAdquisicioneDto: CreateAdquisicioneDto) {
    return this.adquisicionesService.create(createAdquisicioneDto);
  }

  @Get('/listar/:id')
  findAll(@Param('id') id: string, @Request() req) {
    const inquilinoId = req.user.inquilinoId;
    return this.adquisicionesService.findAll(id, inquilinoId);
  }

  @Get(':id')
  findOne(@Param('id') id: string, @Request() req) {
    const inquilinoId = req.user.inquilinoId;
    return this.adquisicionesService.findOne(+id, inquilinoId);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateAdquisicioneDto: UpdateAdquisicioneDto,
  ) {
    return this.adquisicionesService.update(+id, updateAdquisicioneDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.adquisicionesService.remove(+id);
  }

  @Get('energeticos/:idMesProceso')
  findEnergeticosByMesProceso(@Param('idMesProceso') idMesProceso: string) {
    return this.adquisicionesService.findEnergeticosByMesProceso(idMesProceso);
  }

  @Get('energeticos-mes-proceso-transaccion/:idMesProceso')
  findEnergeticosByMesProcesoConTransaccion4(
    @Param('idMesProceso') idMesProceso: string,
  ) {
    return this.adquisicionesService.findEnergeticosByMesProcesoConTransaccion4(
      idMesProceso,
    );
  }
}
