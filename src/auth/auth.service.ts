import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../prisma/prisma.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly prisma: PrismaService,
  ) {}

  async validateUser(userName: string, password: string) {
    const user = await this.prisma.user.findUnique({ where: { userName } });
    if (user && (await bcrypt.compare(password, user.password))) {
      // Return user without sensitive info
      const { password, ...result } = user;
      return result;
    }
    throw new UnauthorizedException('Invalid credentials');
  }

  async login(user: any) {
    const payload = { ...user };
    return {
      accessToken: this.jwtService.sign(payload),
    };
  }
}
