import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import {
  Observable,
  catchError,
  finalize,
  forkJoin,
  map,
  of,
  switchMap,
  tap,
  throwError
} from 'rxjs';

import { environment } from '../../../environments/environment';

import {
  AccessPayload,
  LoginRequest,
  PermissionsPayload,
  ProfilePayload,
  SessionTokens
} from '../models/auth.model';

import { SessionStore } from './session.store';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly http = inject(HttpClient);
  private readonly store = inject(SessionStore);

  private readonly base = `${environment.apiUrl}/sesion`;

  login(payload: LoginRequest): Observable<AccessPayload> {
    return this.http
      .post<SessionTokens>(`${this.base}/login`, payload)
      .pipe(
        tap(tokens => this.store.setTokens(tokens)),
        switchMap(() => this.me()),
        catchError(error => {
          this.store.clear();
          return throwError(() => error);
        })
      );
  }

  me(): Observable<AccessPayload> {
    return forkJoin({
      profile: this.http.get<ProfilePayload>(
        `${this.base}/perfil`
      ),
      permissions: this.http.get<PermissionsPayload>(
        `${environment.apiUrl}/permisos`
      )
    }).pipe(
      map(response => ({
        user: response.profile.user,
        permissions: response.permissions.permissions
      })),
      tap(access => {
        this.store.setAccess(
          access.user,
          access.permissions
        );
      })
    );
  }

  refresh(): Observable<SessionTokens> {
    const refreshToken = this.store.refreshToken();

    if (!refreshToken) {
      this.store.clear();

      return throwError(
        () => new Error('No existe un refresh token disponible.')
      );
    }

    return this.http
      .post<SessionTokens>(`${this.base}/refresh`, {
        refresh_token: refreshToken
      })
      .pipe(
        tap(tokens => this.store.setTokens(tokens))
      );
  }

  logout(): Observable<unknown> {
    const refreshToken = this.store.refreshToken();

    if (!refreshToken) {
      this.store.clear();
      return of(null);
    }

    return this.http
      .post(`${this.base}/logout`, {
        refresh_token: refreshToken
      })
      .pipe(
        catchError(() => of(null)),
        finalize(() => this.store.clear())
      );
  }
}
