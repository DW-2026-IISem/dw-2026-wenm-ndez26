import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { SessionStore } from '../auth/session.store';

/**
 * Protege las pantallas que requieren autenticación obligatoria.
 */
export const authOnlyGuard: CanActivateFn = () => {
  const session = inject(SessionStore);
  const router = inject(Router);

  if (session.authEnabled) {
    return true;
  }

  return router.createUrlTree(['/dashboard']);
};
