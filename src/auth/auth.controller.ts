import {
  Body,
  Controller,
  Get,
  Post,
  UseGuards,
  Request,
  Req,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { AuthGuard } from './guard/auth.guard';
import { Roles } from './decorators/roles.decorator';
import { RolesGuard } from './guard/roles.guard';
import { Role } from './enums/rol.enum';
import { Auth } from './decorators/auth.decorator';

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

  @Post('login')
  login(
    @Body()
    loginDto: LoginDto,
  ) {
    return this.authService.login(loginDto);
  }

  /*@Get('profile')
  @Roles(Role.ADMIN_SAAS)
  @UseGuards(AuthGuard, RolesGuard)
  profile(@Req() req: RequestWithUser) {
    return this.authService.profile(req.user);
  } */

  @Get('profile')
  @Auth(Role.ADMIN_SAAS)
  profile(@Req() req: RequestWithUser) {
    return this.authService.profile(req.user);
  }
}
