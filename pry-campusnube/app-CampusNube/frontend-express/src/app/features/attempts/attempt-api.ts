
import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, map } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Attempt, AttemptPayload } from '../../core/models/attempt.model';

@Injectable({ providedIn: 'root' })
export class AttemptApi {
  private readonly http = inject(HttpClient);
  private readonly base = `${environment.apiUrl}/intentos`;

  list(): Observable<Attempt[]> {
    return this.http.get<{ attempts: Attempt[] }>(this.base)
      .pipe(map(response => response.attempts));
  }

  get(id: number): Observable<Attempt> {
    return this.http.get<{ attempt: Attempt }>(`${this.base}/${id}`)
      .pipe(map(response => response.attempt));
  }

  create(payload: AttemptPayload): Observable<Attempt> {
    return this.http.post<{ attempt: Attempt }>(this.base, payload)
      .pipe(map(response => response.attempt));
  }

  update(id: number, payload: Partial<AttemptPayload>): Observable<Attempt> {
    return this.http.patch<{ attempt: Attempt }>(`${this.base}/${id}`, payload)
      .pipe(map(response => response.attempt));
  }

  replace(id: number, payload: AttemptPayload): Observable<Attempt> {
    return this.http.put<{ attempt: Attempt }>(`${this.base}/${id}`, payload)
      .pipe(map(response => response.attempt));
  }

  deactivate(id: number): Observable<unknown> {
    return this.http.patch(`${this.base}/${id}/deactivate`, {});
  }

  remove(id: number): Observable<unknown> {
    return this.http.delete(`${this.base}/${id}`);
  }
}
