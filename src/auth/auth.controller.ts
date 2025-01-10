import {
  Controller,
  Post,
  Get,
  Body,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() body: { userName: string; password: string }) {
    const { userName, password } = body;

    const user = await this.authService.validateUser(userName, password);
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }
    const accessToken = await this.authService.login(user);
    return {
      ...accessToken,
      user,
    };
  }

  @Post('refresh')
  async refresh(@Body() body: { refreshToken: string }) {
    const { refreshToken } = body;
    return this.authService.refreshToken(refreshToken);
  }
}
