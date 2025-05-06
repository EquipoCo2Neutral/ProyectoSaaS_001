import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CategoriaUfService } from './categoria-uf.service';
import { CreateCategoriaUfDto } from './dto/create-categoria-uf.dto';
import { UpdateCategoriaUfDto } from './dto/update-categoria-uf.dto';

@Controller('categoria-uf')
export class CategoriaUfController {
  constructor(private readonly categoriaUfService: CategoriaUfService) {}

  @Post()
  create(@Body() createCategoriaUfDto: CreateCategoriaUfDto) {
    return this.categoriaUfService.create(createCategoriaUfDto);
  }

  @Get()
  findAll() {
    return this.categoriaUfService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.categoriaUfService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCategoriaUfDto: UpdateCategoriaUfDto) {
    return this.categoriaUfService.update(+id, updateCategoriaUfDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.categoriaUfService.remove(+id);
  }
}
