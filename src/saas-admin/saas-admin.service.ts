import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm'; //facilita la integracion de typeorm con nestjs
import { CreateSaasAdminDto } from './dto/create-saas-admin.dto';
import { UpdateSaasAdminDto } from './dto/update-saas-admin.dto';
import { Repository } from 'typeorm';
import { SaasAdmin } from './entities/saas-admin.entity';

@Injectable()
export class SaasAdminService {
  constructor(
    @InjectRepository(SaasAdmin)
    private readonly saasAdminRepository: Repository<SaasAdmin>,
  ) {}

  create(createSaasAdminDto: CreateSaasAdminDto) {
    const adminSaas = new SaasAdmin();
    adminSaas.name = createSaasAdminDto.name;
    adminSaas.email = createSaasAdminDto.email;
    adminSaas.password = createSaasAdminDto.password;

    return this.saasAdminRepository.save(adminSaas);
  }

  findAll() {
    return `This action returns all saasAdmin`;
  }

  findOne(id: number) {
    return `This action returns a #${id} saasAdmin`;
  }

  update(id: number, updateSaasAdminDto: UpdateSaasAdminDto) {
    return `This action updates a #${id} saasAdmin`;
  }

  remove(id: number) {
    return `This action removes a #${id} saasAdmin`;
  }
}
