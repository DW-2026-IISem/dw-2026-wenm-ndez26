
import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class RoleUserApi {
  private readonly http = inject(HttpClient);
  private readonly base = `${environment.apiUrl}/asignaciones-rol`;

  list(): Observable<unknown> {
    return this.http.get(this.base);
  }

  get(id: number): Observable<unknown> {
    return this.http.get(`${this.base}/${id}`);
  }

  assign(payload: { user_id: number; role_id: number }): Observable<unknown> {
    return this.http.post(this.base, payload);
  }

  deactivate(id: number): Observable<unknown> {
    return this.http.patch(`${this.base}/${id}/deactivate`, {});
  }

  reactivate(id: number): Observable<unknown> {
    return this.http.patch(`${this.base}/${id}/reactivate`, {});
  }
}
