import {
  Injectable,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  handleRequest(err: any, user: any, info: any, context: ExecutionContext) {
    if (err || !user) {
      throw err || new UnauthorizedException('Invalid or missing token');
    }
    return user;
  }
}

export class AdminJwtAuthGuard extends AuthGuard('jwt') {
  handleRequest(err: any, user: any, info: any, context: ExecutionContext) {
    if (err || !user.isAdmin) {
      throw err || new UnauthorizedException('Invalid or missing token');
    }
    return user;
  }
}

export class RootAdminJwtAuthGuard extends AuthGuard('jwt') {
  handleRequest(err: any, user: any, info: any, context: ExecutionContext) {
    if (err || !user.isRootAdmin) {
      throw err || new UnauthorizedException('Invalid or missing token');
    }
    return user;
  }
}
