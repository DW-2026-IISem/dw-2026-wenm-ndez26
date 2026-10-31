import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, map } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { EffectivePermission, PermissionsPayload } from '../../../core/models/auth.model';
import { User, UserPayload, UserUpdatePayload } from '../../../core/models/user.model';

@Injectable({ providedIn: 'root' })
export class UserApi {
  private readonly http = inject(HttpClient);
  private readonly base = `${environment.apiUrl}/usuarios`;

  list(): Observable<User[]> {
    return this.http.get<{ users: User[] }>(this.base).pipe(map((response) => response.users));
  }

  get(id: number): Observable<User> {
    return this.http
      .get<{ user: User }>(`${this.base}/${id}`)
      .pipe(map((response) => response.user));
  }

  create(payload: UserPayload): Observable<User> {
    return this.http
      .post<{ user: User }>(this.base, payload)
      .pipe(map((response) => response.user));
  }

  update(id: number, payload: UserUpdatePayload): Observable<User> {
    return this.http
      .patch<{ user: User }>(`${this.base}/${id}`, payload)
      .pipe(map((response) => response.user));
  }

  permissions(id: number): Observable<EffectivePermission[]> {
    return this.http
      .get<PermissionsPayload>(`${this.base}/${id}/permisos`)
      .pipe(map((response) => response.permissions));
  }

  changePassword(
    id: number,
    payload: {
      current_password: string;
      new_password: string;
    },
  ): Observable<unknown> {
    return this.http.patch(`${this.base}/${id}/password`, payload);
  }

  deactivate(id: number): Observable<unknown> {
    return this.http.patch(`${this.base}/${id}/deactivate`, {});
  }

  remove(id: number): Observable<unknown> {
    return this.http.delete(`${this.base}/${id}`);
  }
}
