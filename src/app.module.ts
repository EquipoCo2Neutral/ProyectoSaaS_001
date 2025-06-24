import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm'; //para usar typeorm
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SaasAdminModule } from './saas-admin/saas-admin.module';
import { typeOrmConfig } from './config/typeorm.config';
import { PlanModule } from './administracion/plan/plan.module';
import { PersonaModule } from './administracion/persona/persona.module';
import { RolModule } from './administracion/rol/rol.module';
import { SuscripcionModule } from './administracion/suscripcion/suscripcion.module';
import { PaisesModule } from './complementos/paises/paises.module';
import { RegionesModule } from './complementos/regiones/regiones.module';
import { ComunasModule } from './complementos/comunas/comunas.module';
import { InquilinoModule } from './administracion/inquilino/inquilino.module';
import { UsuarioModule } from './administracion/usuario/usuario.module';
import { PlantaModule } from './administracion/planta/planta.module';
import { EquipoSaassModule } from './administracion/equipo-saass/equipo-saass.module';
import { AuthModule } from './auth/auth.module';
import { TokenModule } from './administracion/token/token.module';
import { MailsModule } from './mails/mails.module';
import { MesesModule } from './complementos/meses/meses.module';
import { ProcesoModule } from './gestor/proceso/proceso.module';
import { MesProcesoModule } from './gestor/mes-proceso/mes-proceso.module';
import { TransaccionesModule } from './complementos/energia/transacciones/transacciones.module';
import { GrupoEnergeticoModule } from './complementos/energia/grupo-energetico/grupo-energetico.module';
import { EnergeticosModule } from './complementos/energia/energeticos/energeticos.module';
import { UnidadesModule } from './complementos/energia/unidades/unidades.module';
import { AdquisicionesModule } from './registro/adquisiciones/adquisiciones.module';
import { GeneracionModule } from './registro/generacion/generacion.module';
import { TransformacionesModule } from './registro/transformaciones/transformaciones.module';
import { UsosFinalesModule } from './registro/usos-finales/usos-finales.module';
import { CategoriaUfModule } from './complementos/energia/categoria-uf/categoria-uf.module';
import { TipoUfModule } from './complementos/energia/tipo-uf/tipo-uf.module';

import { VentaElectricidadModule } from './registro/venta-electricidad/venta-electricidad.module';

import { SectorEconomicoModule } from './complementos/energia/sector-economico/sector-economico.module';

import { SubSectorEconomicoModule } from './complementos/energia/sub-sector-economico/sub-sector-economico.module';

import { VentaEnergeticoModule } from './registro/venta-energetico/venta-energetico.module';

import { ExportacionesModule } from './registro/exportaciones/exportaciones.module';
import { ResumenTransaccionesModule } from './registro/resumen-transacciones/resumen-transacciones.module';
import { PdfModule } from './PDF/pdf/pdf.module';

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
    SuscripcionModule,
    PaisesModule,
    RegionesModule,
    ComunasModule,
    InquilinoModule,
    UsuarioModule,
    PlantaModule,
    EquipoSaassModule,
    AuthModule,
    TokenModule,
    MailsModule,
    MesesModule,
    ProcesoModule,
    MesProcesoModule,
    TransaccionesModule,
    GrupoEnergeticoModule,
    EnergeticosModule,
    UnidadesModule,
    AdquisicionesModule,
    GeneracionModule,
    TransformacionesModule,
    UsosFinalesModule,
    CategoriaUfModule,
    TipoUfModule,
    VentaElectricidadModule,
    SectorEconomicoModule,
    SubSectorEconomicoModule,
    VentaEnergeticoModule,
    ExportacionesModule,
    ResumenTransaccionesModule,
    PdfModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
