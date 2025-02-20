import { PartialType } from '@nestjs/mapped-types';
import { CreateSaasAdminDto } from './create-saas-admin.dto';

export class UpdateSaasAdminDto extends PartialType(CreateSaasAdminDto) {}
