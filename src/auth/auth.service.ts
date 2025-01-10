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
    return {
      accessToken: await this.generateAccessToken(user),
      refreshToken: await this.generateRefreshToken(user),
    };
  }

  async refreshToken(refreshToken: string) {
    try {
      // Verify the refresh token
      const payload = await this.jwtService.verifyAsync(refreshToken, {
        secret: process.env.JWT_SECRET, // Make sure to set this in your env
      });

      // Find the user
      const user = await this.prisma.user.findUnique({
        where: { id: payload.sub },
      });
      if (!user) {
        throw new UnauthorizedException('User not found');
      }

      // Generate new access token
      const accessToken = this.jwtService.sign({ ...user });

      return {
        accessToken: accessToken,
        // Optionally generate new refresh token if you want to rotate them
        // refresh_token: await this.generateRefreshToken(user),
      };
    } catch {
      throw new UnauthorizedException('Invalid refresh token');
    }
  }

  private async generateAccessToken(user: any) {
    const payload = { sub: user.id, username: user.userName };
    return this.jwtService.sign(payload);
  }

  private async generateRefreshToken(user: any) {
    const payload = { sub: user.id };
    return this.jwtService.sign(payload, {
      secret: process.env.JWT_SECRET,
      expiresIn: '2h', // Longer expiration for refresh token
    });
  }
}
