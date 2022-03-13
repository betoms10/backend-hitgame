import { AuthGuard } from '../guards/auth.guard';
import { RolesGuard } from '../guards/roles.guard';

export const securityProviders = [
  {
    provide: 'ROLE_GUARD',
    useClass: RolesGuard
  },
  {
    provide: 'AUTH_GUARD',
    useClass: AuthGuard
  }
];
