
import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';

export interface LoginPayload {
  username: string;
  password: string;
}

export interface RefreshPayload {
  refreshToken: string;
}

export interface SessionTokens {
  accessToken: string;
  refreshToken: string;
  [key: string]: unknown;
}

@Injectable({ providedIn: 'root' })
export class SessionApi {
  private readonly http = inject(HttpClient);
  private readonly base = `${environment.apiUrl}/sesion`;

  login(payload: LoginPayload): Observable<SessionTokens> {
    return this.http.post<SessionTokens>(`${this.base}/login`, payload);
  }

  refresh(payload: RefreshPayload): Observable<SessionTokens> {
    return this.http.post<SessionTokens>(`${this.base}/refresh`, payload);
  }

  logout(payload: { refreshToken: string }): Observable<unknown> {
    return this.http.post(`${this.base}/logout`, payload);
  }

  profile(): Observable<unknown> {
    return this.http.get(`${this.base}/perfil`);
  }

  myPermissions(): Observable<unknown> {
    return this.http.get(`${environment.apiUrl}/permisos`);
  }
}
