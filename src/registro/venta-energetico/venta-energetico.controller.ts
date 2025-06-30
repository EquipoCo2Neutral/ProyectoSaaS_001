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
import { VentaEnergeticoService } from './venta-energetico.service';
import { CreateVentaEnergeticoDto } from './dto/create-venta-energetico.dto';
import { UpdateVentaEnergeticoDto } from './dto/update-venta-energetico.dto';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { Role } from 'src/common/enums/rol.enum';

@Auth(Role.GESTOR)
@Controller('venta-energetico')
export class VentaEnergeticoController {
  constructor(
    private readonly ventaEnergeticoService: VentaEnergeticoService,
  ) {}

  @Post()
  create(@Body() createVentaEnergeticoDto: CreateVentaEnergeticoDto) {
    return this.ventaEnergeticoService.create(createVentaEnergeticoDto);
  }

  @Get('listar/:id')
  findAll(@Param('id') id: string) {
    return this.ventaEnergeticoService.findAll(id);
  }

  @Get(':id')
  findOne(@Param('id') id: string, @Request() req) {
    const inquilinoId = req.user.inquilinoId;
    return this.ventaEnergeticoService.findOne(+id, inquilinoId);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateVentaEnergeticoDto: UpdateVentaEnergeticoDto,
  ) {
    return this.ventaEnergeticoService.update(+id, updateVentaEnergeticoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.ventaEnergeticoService.remove(+id);
  }
}
