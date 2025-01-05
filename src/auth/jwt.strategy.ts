import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET, // Replace with your secret
    });
  }

  async validate(payload: any) {
    return {
      id: payload.id,
      name: payload.name,
      username: payload.userName,
      isAdmin: payload.isAdmin,
      isRootAdmin: payload.isRootAdmin,
      createdAt: payload.createdAt,
      updatedAt: payload.updatedAt,
    };
  }
}
