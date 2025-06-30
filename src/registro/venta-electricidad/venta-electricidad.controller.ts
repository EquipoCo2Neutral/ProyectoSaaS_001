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
import { VentaElectricidadService } from './venta-electricidad.service';
import { CreateVentaElectricidadDto } from './dto/create-venta-electricidad.dto';
import { UpdateVentaElectricidadDto } from './dto/update-venta-electricidad.dto';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { Role } from 'src/common/enums/rol.enum';

@Auth(Role.GESTOR)
@Controller('venta-electricidad')
export class VentaElectricidadController {
  constructor(
    private readonly ventaElectricidadService: VentaElectricidadService,
  ) {}

  @Post()
  create(@Body() createVentaElectricidadDto: CreateVentaElectricidadDto) {
    return this.ventaElectricidadService.create(createVentaElectricidadDto);
  }

  @Get('listar/:id')
  findAll(@Param('id') id: string) {
    return this.ventaElectricidadService.findAll(id);
  }

  @Get(':id')
  findOne(@Param('id') id: string, @Request() req) {
    const inquilinoId = req.user.inquilinoId;
    return this.ventaElectricidadService.findOne(+id, inquilinoId);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateVentaElectricidadDto: UpdateVentaElectricidadDto,
  ) {
    return this.ventaElectricidadService.update(
      +id,
      updateVentaElectricidadDto,
    );
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.ventaElectricidadService.remove(+id);
  }
}
