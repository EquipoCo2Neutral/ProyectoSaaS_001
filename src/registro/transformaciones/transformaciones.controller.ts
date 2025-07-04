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
import { TransformacionesService } from './transformaciones.service';
import { CreateTransformacioneDto } from './dto/create-transformacione.dto';
import { UpdateTransformacioneDto } from './dto/update-transformacione.dto';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { Role } from 'src/common/enums/rol.enum';

@Auth(Role.GESTOR)
@Controller('transformacion')
export class TransformacionesController {
  constructor(
    private readonly transformacionesService: TransformacionesService,
  ) {}

  @Post()
  create(@Body() createTransformacioneDto: CreateTransformacioneDto) {
    return this.transformacionesService.create(createTransformacioneDto);
  }

  @Get('listar/:id')
  findAll(@Param('id') id: string) {
    return this.transformacionesService.findAll(id);
  }

  @Get(':id')
  findOne(@Param('id') id: string, @Request() req) {
    const inquilinoId = req.user.inquilinoId;
    return this.transformacionesService.findOne(+id, inquilinoId);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateTransformacioneDto: UpdateTransformacioneDto,
  ) {
    return this.transformacionesService.update(+id, updateTransformacioneDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.transformacionesService.remove(+id);
  }
}
