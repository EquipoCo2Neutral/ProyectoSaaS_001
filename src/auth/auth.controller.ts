import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  Req,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { Role } from '../common/enums/rol.enum';
import { Auth } from './decorators/auth.decorator';
import { ActiveUser } from 'src/common/decorators/active-user.decorator';
import { UserActiveInterface } from 'src/common/interface/user-active.interface';
import { LoginEquipoDto } from './dto/loginEquipo.dto';
import { RegisterEquipoDto } from './dto/registerEquipo.dto';
import { User } from 'src/interfaces/user';
import { MailsService } from 'src/mails/mails.service';
import { SendTokenDto } from './dto/sendtoken.dto';
import { TokenService } from 'src/administracion/token/token.service';
import { ValidateTokenDto } from './dto/validateToken.dto';
import { UpdatePasswordDto } from './dto/updatePasswordDto';

@Controller('auth')
export class AuthController {
  //inyectar el servicio de autenticación

  constructor(
    private readonly authService: AuthService,
    private readonly mailsService: MailsService,
    private readonly tokenService: TokenService,
  ) {}

  @Auth(Role.ADMIN_INQUILINO)
  @Post('invitation')
  create(@Body() user: User) {
    return {
      result: this.mailsService.sendInvitation(
        user.nombre,
        user.correoUsuario,
        user.rolId,
        user.inquilinoId,
      ),
      message: 'Invitación enviada correctamente',
    };
  }

  @Get('validate-invitation')
  async validateInvitation(@Query('token') token: string) {
    return this.authService.validateInvitationToken(token);
  }

  @Post('register')
  register(
    @Body()
    registerDto: RegisterDto,
  ) {
    return this.authService.register(registerDto);
  }

  @Post('register-equipo')
  register_equipo(
    @Body()
    registerEquipoDto: RegisterEquipoDto,
  ) {
    return this.authService.register_equipo(registerEquipoDto);
  }

  @Post('login')
  login(
    @Body()
    loginDto: LoginDto,
  ) {
    return this.authService.login(loginDto);
  }

  @Post('login-equipo')
  login_equipo(
    @Body()
    loginEquipoDto: LoginEquipoDto,
  ) {
    return this.authService.login_equipo(loginEquipoDto);
  }

  @Post('request-code')
  reques(
    @Body()
    sendTokenDto: SendTokenDto,
  ) {
    return this.authService.requestConfirmationCode(sendTokenDto);
  }

  @Post('forgot-password')
  forgot(
    @Body()
    sendTokenDto: SendTokenDto,
  ) {
    return this.authService.forgotPassword(sendTokenDto);
  }

  @Post('validate-token')
  validate(
    @Body()
    valiteToken: ValidateTokenDto,
  ) {
    return this.tokenService.validateToken(valiteToken.token);
  }

  @Post('update-password/:token')
  updatePassword(
    @Param('token') token: string,
    @Body() updatePassword: UpdatePasswordDto,
  ) {
    return this.tokenService.updatePasswordWithToken(
      token,
      updatePassword.contrasenaUsuario,
    );
  }
  /*@Get('profile')
  @Roles(Role.ADMIN_SAAS)
  @UseGuards(AuthGuard, RolesGuard)
  profile(@Req() req: RequestWithUser) {
    return this.authService.profile(req.user);
  } */

  @Get('profile')
  @Auth(Role.ADMIN_SAAS)
  profile(@ActiveUser() user: UserActiveInterface) {
    return this.authService.profile(user);
  }

  @Get('profile-equipo')
  @Auth(Role.ADMIN_SAAS)
  profile_equipo(@ActiveUser() user: UserActiveInterface) {
    return this.authService.profile_equipo(user);
  }
}
