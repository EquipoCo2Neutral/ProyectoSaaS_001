import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { SaasAdminService } from './saas-admin.service';
import { CreateSaasAdminDto } from './dto/create-saas-admin.dto';
import { UpdateSaasAdminDto } from './dto/update-saas-admin.dto';

@Controller('saas-admin')
export class SaasAdminController {
  constructor(private readonly saasAdminService: SaasAdminService) {}

  @Post()
  create(@Body() createSaasAdminDto: CreateSaasAdminDto) {
    console.log(createSaasAdminDto);
    return this.saasAdminService.create(createSaasAdminDto);
  }

  @Get()
  findAll() {
    return this.saasAdminService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.saasAdminService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateSaasAdminDto: UpdateSaasAdminDto,
  ) {
    return this.saasAdminService.update(+id, updateSaasAdminDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.saasAdminService.remove(+id);
  }
}
