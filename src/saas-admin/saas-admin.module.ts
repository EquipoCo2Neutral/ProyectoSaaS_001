import { Module } from '@nestjs/common';
import { SaasAdminService } from './saas-admin.service';
import { SaasAdminController } from './saas-admin.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SaasAdmin } from './entities/saas-admin.entity';

@Module({
  imports: [TypeOrmModule.forFeature([SaasAdmin])],
  controllers: [SaasAdminController],
  providers: [SaasAdminService],
})
export class SaasAdminModule {}
