
import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, map } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Progress, ProgressPayload } from '../../core/models/progress.model';

@Injectable({ providedIn: 'root' })
export class ProgressApi {
  private readonly http = inject(HttpClient);
  private readonly base = `${environment.apiUrl}/progress`;

  list(): Observable<Progress[]> {
    return this.http.get<{ progress: Progress[] }>(this.base)
      .pipe(map(response => response.progress));
  }

  get(id: number): Observable<Progress> {
    return this.http.get<{ progress: Progress }>(`${this.base}/${id}`)
      .pipe(map(response => response.progress));
  }

  create(payload: ProgressPayload): Observable<Progress> {
    return this.http.post<{ progress: Progress }>(this.base, payload)
      .pipe(map(response => response.progress));
  }

  update(id: number, payload: Partial<ProgressPayload>): Observable<Progress> {
    return this.http.patch<{ progress: Progress }>(`${this.base}/${id}`, payload)
      .pipe(map(response => response.progress));
  }

  replace(id: number, payload: ProgressPayload): Observable<Progress> {
    return this.http.put<{ progress: Progress }>(`${this.base}/${id}`, payload)
      .pipe(map(response => response.progress));
  }

  remove(id: number): Observable<unknown> {
    return this.http.delete(`${this.base}/${id}`);
  }
}
