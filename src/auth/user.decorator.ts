import { createParamDecorator, ExecutionContext } from '@nestjs/common';

// Custom decorator to access the user from the request object
export const User = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    return request.user; // This contains the user information added by JwtStrategy's validate method
  },
);
