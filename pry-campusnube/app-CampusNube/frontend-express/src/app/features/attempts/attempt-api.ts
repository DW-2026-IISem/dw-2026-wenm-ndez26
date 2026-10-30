import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from '../../../environments/environment';
import {
  Attempt,
  AttemptPayload,
} from '../../core/models/attempt.model';

@Injectable({ providedIn: 'root' })
export class AttemptApi {
  private readonly http = inject(HttpClient);
  private readonly base = `${environment.apiUrl}/intentos`;

  list(): Observable<Attempt[]> {
    return this.http.get<Attempt[]>(this.base);
  }

  get(id: number): Observable<Attempt> {
    return this.http.get<Attempt>(`${this.base}/${id}`);
  }

  create(payload: AttemptPayload): Observable<Attempt> {
    return this.http.post<Attempt>(this.base, payload);
  }

  update(
    id: number,
    payload: Partial<AttemptPayload>,
  ): Observable<Attempt> {
    return this.http.patch<Attempt>(`${this.base}/${id}`, payload);
  }

  replace(id: number, payload: AttemptPayload): Observable<Attempt> {
    return this.http.put<Attempt>(`${this.base}/${id}`, payload);
  }

  deactivate(id: number): Observable<unknown> {
    return this.http.patch(`${this.base}/${id}/deactivate`, {});
  }

  remove(id: number): Observable<unknown> {
    return this.http.delete(`${this.base}/${id}`);
  }
}
