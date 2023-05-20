import { UserRole } from '../../modules/users/user.entity';
import JwtAuthenticationGuard from '../JWTGuard';

import { CanActivate, ExecutionContext, mixin, Type } from '@nestjs/common';

const RoleGuard = (role: UserRole): Type<CanActivate> => {
  class RoleGuardMixin extends JwtAuthenticationGuard {
    async canActivate(context: ExecutionContext) {
      await super.canActivate(context);

      const request = context.switchToHttp().getRequest();
      const user = request.user;

      return user?.roles.includes(role);
    }
  }

  return mixin(RoleGuardMixin);
};

export default RoleGuard;
