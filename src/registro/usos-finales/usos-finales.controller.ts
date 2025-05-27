import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { UsosFinalesService } from './usos-finales.service';
import { CreateUsosFinaleDto } from './dto/create-usos-finale.dto';
import { UpdateUsosFinaleDto } from './dto/update-usos-finale.dto';

@Controller('usos-finales')
export class UsosFinalesController {
  constructor(private readonly usosFinalesService: UsosFinalesService) {}

  @Post()
  create(@Body() createUsosFinaleDto: CreateUsosFinaleDto) {
    return this.usosFinalesService.create(createUsosFinaleDto);
  }

  @Get('listar/:id')
  findAll(@Param('id') id: string) {
    return this.usosFinalesService.findAll(id);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usosFinalesService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateUsosFinaleDto: UpdateUsosFinaleDto,
  ) {
    return this.usosFinalesService.update(+id, updateUsosFinaleDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usosFinalesService.remove(+id);
  }
}
