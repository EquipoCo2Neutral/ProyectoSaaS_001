import { Body, Controller, Get, Post, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { Role } from '../common/enums/rol.enum';
import { Auth } from './decorators/auth.decorator';
import { ActiveUser } from 'src/common/decorators/active-user.decorator';
import { UserActiveInterface } from 'src/common/interface/user-active.interface';
import { LoginEquipoDto } from './dto/loginEquipo.dto';
import { RegisterEquipoDto } from './dto/registerEquipo.dto';

interface RequestWithUser extends Request {
  user: {
    correoUsuario: string;
    rol: number;
  };
}

@Controller('auth')
export class AuthController {
  //inyectar el servicio de autenticación

  constructor(private readonly authService: AuthService) {}

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
