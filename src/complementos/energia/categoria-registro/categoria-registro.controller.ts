import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CategoriaRegistroService } from './categoria-registro.service';
import { CreateCategoriaRegistroDto } from './dto/create-categoria-registro.dto';
import { UpdateCategoriaRegistroDto } from './dto/update-categoria-registro.dto';

@Controller('categoria-registro')
export class CategoriaRegistroController {
  constructor(private readonly categoriaRegistroService: CategoriaRegistroService) {}

  @Post()
  create(@Body() createCategoriaRegistroDto: CreateCategoriaRegistroDto) {
    return this.categoriaRegistroService.create(createCategoriaRegistroDto);
  }

  @Get()
  findAll() {
    return this.categoriaRegistroService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.categoriaRegistroService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCategoriaRegistroDto: UpdateCategoriaRegistroDto) {
    return this.categoriaRegistroService.update(+id, updateCategoriaRegistroDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.categoriaRegistroService.remove(+id);
  }
}
