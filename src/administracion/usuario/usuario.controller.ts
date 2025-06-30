import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  ParseIntPipe,
} from '@nestjs/common';
import { UsuarioService } from './usuario.service';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { GetUsuarioDto } from './dto/get-usuario.dto';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { Role } from 'src/common/enums/rol.enum';

@Controller('usuario')
export class UsuarioController {
  constructor(private readonly usuarioService: UsuarioService) {}

  @Post()
  create(@Body() createUsuarioDto: CreateUsuarioDto) {
    return this.usuarioService.create(createUsuarioDto);
  }
  @Auth(Role.ADMIN_INQUILINO)
  // Sin rolId
  @Get(':inquilinoId')
  findAll(@Param('inquilinoId') inquilinoId: string) {
    return this.usuarioService.findAll(0, inquilinoId);
  }

  @Auth(Role.ADMIN_INQUILINO)
  // Con rolId
  @Get(':inquilinoId/:rolId')
  findAllConRol(
    @Param('inquilinoId') inquilinoId: string,
    @Param('rolId', ParseIntPipe) rolId: number,
  ) {
    return this.usuarioService.findAll(rolId, inquilinoId);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usuarioService.findOne(id);
  }

  @Get('/correo/:id')
  findOnebyEmail(@Param('id') id: string) {
    return this.usuarioService.findOnebyEmail(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUsuarioDto: UpdateUsuarioDto) {
    return this.usuarioService.update(id, updateUsuarioDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usuarioService.remove(id);
  }
}
