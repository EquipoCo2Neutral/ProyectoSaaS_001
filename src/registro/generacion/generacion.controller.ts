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
import { GeneracionService } from './generacion.service';
import { CreateGeneracionDto } from './dto/create-generacion.dto';
import { UpdateGeneracionDto } from './dto/update-generacion.dto';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { Role } from 'src/common/enums/rol.enum';

@Auth(Role.GESTOR)
@Controller('generacion')
export class GeneracionController {
  constructor(private readonly generacionService: GeneracionService) {}

  @Post()
  create(@Body() createGeneracionDto: CreateGeneracionDto) {
    return this.generacionService.create(createGeneracionDto);
  }

  @Get('/listar/:id')
  findAll(@Param('id') id: string) {
    return this.generacionService.findAll(id);
  }

  @Get(':id')
  findOne(@Param('id') id: string, @Request() req) {
    const inquilinoId = req.user.inquilinoId;
    return this.generacionService.findOne(+id, inquilinoId);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateGeneracionDto: UpdateGeneracionDto,
  ) {
    return this.generacionService.update(+id, updateGeneracionDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.generacionService.remove(+id);
  }
}
