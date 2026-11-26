import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, map } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { RoleUser, RoleUserPayload } from '../../../core/models/role-user.model';

@Injectable({ providedIn: 'root' })
export class RoleUserApi {
  private readonly http = inject(HttpClient);
  private readonly base = `${environment.apiUrl}/asignaciones-rol`;

  list(includeInactive = false): Observable<RoleUser[]> {
    return this.http
      .get<{ assignments: RoleUser[] }>(this.base, {
        params: includeInactive ? { include_inactive: 'true' } : {},
      })
      .pipe(map((response) => response.assignments));
  }

  create(payload: RoleUserPayload): Observable<RoleUser> {
    return this.http
      .post<{ assignment: RoleUser }>(this.base, payload)
      .pipe(map((response) => response.assignment));
  }

  deactivate(id: number): Observable<unknown> {
    return this.http.patch(`${this.base}/${id}/deactivate`, {});
  }

  reactivate(id: number): Observable<unknown> {
    return this.http.patch(`${this.base}/${id}/reactivate`, {});
  }

  createBatch(targetId: number, optionIds: number[]): Observable<{ processed: number }> {
    return this.http.post<{ processed: number }>(this.base + '/lote', {
      user_id: targetId,
      role_ids: optionIds,
    });
  }

  deactivateBatch(ids: number[]): Observable<{ processed: number }> {
    return this.http.patch<{ processed: number }>(this.base + '/lote/deactivate', { ids });
  }
}
