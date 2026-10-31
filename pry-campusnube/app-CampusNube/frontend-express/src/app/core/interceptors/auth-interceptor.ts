import { inject } from '@angular/core';

import {
  HttpErrorResponse,
  HttpInterceptorFn
} from '@angular/common/http';

import {
  catchError,
  finalize,
  Observable,
  shareReplay,
  switchMap,
  throwError
} from 'rxjs';

import { Router } from '@angular/router';
import { SessionStore } from '../auth/session.store';
import { AuthService } from '../auth/auth.service';
import { SessionTokens } from '../models/auth.model';

let refreshInFlight: Observable<SessionTokens> | null = null;

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const store = inject(SessionStore);
  const auth = inject(AuthService);
  const router = inject(Router);

  const publicEndpoints = [
    '/sesion/login',
    '/sesion/refresh',
    '/sesion/logout'
  ];

  const isPublicEndpoint = publicEndpoints.some(endpoint =>
    req.url.includes(endpoint)
  );

  if (isPublicEndpoint) {
    return next(req);
  }

  const token = store.accessToken();

  const authorizedRequest = token
    ? req.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
      })
    : req;

  return next(authorizedRequest).pipe(
    catchError((error: HttpErrorResponse) => {
      if (error.status !== 401 || !store.authEnabled) {
        return throwError(() => error);
      }

      const refreshToken = store.refreshToken();

      if (!refreshToken) {
        store.clear();

        void router.navigate(['/login'], {
          queryParams: {
            returnUrl: router.url
          }
        });

        return throwError(() => error);
      }

      if (!refreshInFlight) {
        refreshInFlight = auth.refresh().pipe(
          catchError(refreshError => {
            store.clear();

            void router.navigate(['/login'], {
              queryParams: {
                returnUrl: router.url
              }
            });

            return throwError(() => refreshError);
          }),
          finalize(() => {
            refreshInFlight = null;
          }),
          shareReplay({
            bufferSize: 1,
            refCount: false
          })
        );
      }

      const refreshRequest = refreshInFlight;

      return refreshRequest.pipe(
        switchMap(tokens => {
          const retryRequest = req.clone({
            setHeaders: {
              Authorization: `Bearer ${tokens.access_token}`
            }
          });

          return next(retryRequest);
        })
      );
    })
  );
};
