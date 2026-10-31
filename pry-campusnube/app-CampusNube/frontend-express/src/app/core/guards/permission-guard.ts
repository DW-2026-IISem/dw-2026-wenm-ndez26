import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { SessionStore } from '../auth/session.store';

/**
 * ¿Qué puedes hacer?
 * El permiso se declara en la ruta:
 * data: { permission: 'GET /api/cursos' }
 *
 * Es una protección visual. Express vuelve a validar
 * la autorización mediante authenticate y authorize.
 */
export const permissionGuard: CanActivateFn = (route) => {
  const session = inject(SessionStore);
  const router = inject(Router);

  if (!session.authEnabled) {
    return true;
  }

  const permission = route.data?.['permission'] as string | undefined;

  if (!permission || session.canPermission(permission)) {
    return true;
  }

  return router.createUrlTree(['/forbidden'], {
    queryParams: { permission }
  });
};
