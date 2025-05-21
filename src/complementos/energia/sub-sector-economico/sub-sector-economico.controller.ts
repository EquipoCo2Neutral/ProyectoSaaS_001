import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { SubSectorEconomicoService } from './sub-sector-economico.service';
import { CreateSubSectorEconomicoDto } from './dto/create-sub-sector-economico.dto';
import { UpdateSubSectorEconomicoDto } from './dto/update-sub-sector-economico.dto';

@Controller('sub-sector-economico')
export class SubSectorEconomicoController {
  constructor(
    private readonly subSectorEconomicoService: SubSectorEconomicoService,
  ) {}

  @Post()
  create(@Body() createSubSectorEconomicoDto: CreateSubSectorEconomicoDto) {
    return this.subSectorEconomicoService.create(createSubSectorEconomicoDto);
  }

  @Get('sector/:id')
  findBySector(@Param('id') id: string) {
    return this.subSectorEconomicoService.findAll(+id);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.subSectorEconomicoService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateSubSectorEconomicoDto: UpdateSubSectorEconomicoDto,
  ) {
    return this.subSectorEconomicoService.update(
      +id,
      updateSubSectorEconomicoDto,
    );
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.subSectorEconomicoService.remove(+id);
  }
}
