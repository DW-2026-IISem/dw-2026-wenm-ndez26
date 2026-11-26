import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, map } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { ResourceRole, ResourceRolePayload } from '../../../core/models/resource-role.model';

@Injectable({ providedIn: 'root' })
export class ResourceRoleApi {
  private readonly http = inject(HttpClient);
  private readonly base = `${environment.apiUrl}/concesiones-rol`;

  list(filters?: {
    role_id?: number;
    resource_id?: number;
    includeInactive?: boolean;
  }): Observable<ResourceRole[]> {
    let params = new HttpParams();

    if (filters?.includeInactive) {
      params = params.set('include_inactive', 'true');
    }

    if (filters?.role_id !== undefined) {
      params = params.set('role_id', filters.role_id);
    }

    if (filters?.resource_id !== undefined) {
      params = params.set('resource_id', filters.resource_id);
    }

    return this.http
      .get<{ grants: ResourceRole[] }>(this.base, { params })
      .pipe(map((response) => response.grants));
  }

  create(payload: ResourceRolePayload): Observable<ResourceRole> {
    return this.http
      .post<{ message: string; grant: ResourceRole }>(this.base, payload)
      .pipe(map((response) => response.grant));
  }

  deactivate(id: number): Observable<unknown> {
    return this.http.patch(`${this.base}/${id}/deactivate`, {});
  }

  reactivate(id: number): Observable<unknown> {
    return this.http.patch(`${this.base}/${id}/reactivate`, {});
  }

  createBatch(targetId: number, optionIds: number[]): Observable<{ processed: number }> {
    return this.http.post<{ processed: number }>(this.base + '/lote', {
      role_id: targetId,
      resource_ids: optionIds,
    });
  }

  deactivateBatch(ids: number[]): Observable<{ processed: number }> {
    return this.http.patch<{ processed: number }>(this.base + '/lote/deactivate', { ids });
  }
}
