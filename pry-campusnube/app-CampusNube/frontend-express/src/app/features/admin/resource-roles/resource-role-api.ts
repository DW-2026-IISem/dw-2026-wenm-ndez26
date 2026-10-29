
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class ResourceRoleApi {
  private readonly http = inject(HttpClient);
  private readonly base = `${environment.apiUrl}/concesiones-rol`;

  list(filters?: Record<string, string>): Observable<unknown> {
    let params = new HttpParams();

    if (filters) {
      for (const [key, value] of Object.entries(filters)) {
        params = params.set(key, value);
      }
    }

    return this.http.get(this.base, { params });
  }

  get(id: number): Observable<unknown> {
    return this.http.get(`${this.base}/${id}`);
  }

  grant(payload: { role_id: number; resource_id: number }): Observable<unknown> {
    return this.http.post(this.base, payload);
  }

  deactivate(id: number): Observable<unknown> {
    return this.http.patch(`${this.base}/${id}/deactivate`, {});
  }

  reactivate(id: number): Observable<unknown> {
    return this.http.patch(`${this.base}/${id}/reactivate`, {});
  }
}
