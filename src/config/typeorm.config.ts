import { ConfigService } from '@nestjs/config';
import type { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { join } from 'path';

export const typeOrmConfig = (
  ConfigService: ConfigService,
): TypeOrmModuleOptions => ({
  type: 'postgres',
  host: ConfigService.get('DATABASE_HOST'),
  port: ConfigService.get<number>('DATABASE_PORT'),
  username: ConfigService.get('DATABASE_USER'),
  password: ConfigService.get('DATABASE_PASS'),
  database: ConfigService.get('DATABASE_NAME'),
  ssl: true,
  logging: true,
  entities: [join(__dirname + '../../**/*.entity{.ts,.js}')],
  synchronize: true,
});
