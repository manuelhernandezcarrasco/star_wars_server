import { Injectable, CanActivate, ExecutionContext, ForbiddenException, Type, mixin } from '@nestjs/common';
import { UserRole } from '@prisma/client';

export const RolesGuard = (...allowedRoles: UserRole[]) => {
  @Injectable()
  class MixinRolesGuard implements CanActivate {
    canActivate(context: ExecutionContext): boolean {
      const request = context.switchToHttp().getRequest();
      const user = request.user;

      if (!user) throw new ForbiddenException('User not found in request');

      if (!allowedRoles.includes(user.role)) {
        throw new ForbiddenException('Insufficient role');
      }

      return true;
    }
  }

  return mixin(MixinRolesGuard);
};
