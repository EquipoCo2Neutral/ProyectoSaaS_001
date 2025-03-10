import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm'; //para usar typeorm
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SaasAdminModule } from './saas-admin/saas-admin.module';
import { typeOrmConfig } from './config/typeorm.config';
import { PlanModule } from './plan/plan.module';
import { PersonaModule } from './persona/persona.module';
import { RolModule } from './rol/rol.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // para que las variables de entorno estén disponibles en toda la aplicación
    }),
    TypeOrmModule.forRootAsync({
      useFactory: typeOrmConfig,
      inject: [ConfigService],
    }),
    SaasAdminModule,
    PlanModule,
    PersonaModule,
    RolModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
