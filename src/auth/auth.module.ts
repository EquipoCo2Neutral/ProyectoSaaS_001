import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsuarioModule } from 'src/administracion/usuario/usuario.module';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './constants/jwt.constant';
import { EquipoSaassModule } from 'src/administracion/equipo-saass/equipo-saass.module';
import { MailsModule } from 'src/mails/mails.module';
import { Token } from 'src/administracion/token/entities/token.entity';
import { TokenModule } from 'src/administracion/token/token.module';

@Module({
  imports: [
    UsuarioModule,
    EquipoSaassModule,
    TokenModule,
    MailsModule,
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '1d' },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
