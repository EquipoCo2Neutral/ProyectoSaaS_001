import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { InquilinoService } from './inquilino.service';
import { CreateInquilinoDto } from './dto/create-inquilino.dto';
import { UpdateInquilinoDto } from './dto/update-inquilino.dto';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { Role } from 'src/common/enums/rol.enum';

//para especificar el rol que puede acceder a este controlador y sus endpoints
@Auth(Role.ADMIN_SAAS)
@Controller('inquilino')
export class InquilinoController {
  constructor(private readonly inquilinoService: InquilinoService) {}

  @Post('create')
  create(@Body() createInquilinoDto: CreateInquilinoDto) {
    return this.inquilinoService.create(createInquilinoDto);
  }

  @Get()
  findAll() {
    return this.inquilinoService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    console.log('id', id);
    return this.inquilinoService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateInquilinoDto: UpdateInquilinoDto,
  ) {
    return this.inquilinoService.update(+id, updateInquilinoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.inquilinoService.remove(+id);
  }
}
