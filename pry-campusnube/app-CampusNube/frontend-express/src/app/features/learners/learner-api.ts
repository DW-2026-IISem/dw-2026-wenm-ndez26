
import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, map } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Learner, LearnerPayload } from '../../core/models/learner.model';

@Injectable({ providedIn: 'root' })
export class LearnerApi {
  private readonly http = inject(HttpClient);
  private readonly base = `${environment.apiUrl}/aprendices`;

  list(): Observable<Learner[]> {
    return this.http.get<{ learners: Learner[] }>(this.base)
      .pipe(map(response => response.learners));
  }

  get(id: number): Observable<Learner> {
    return this.http.get<{ learner: Learner }>(`${this.base}/${id}`)
      .pipe(map(response => response.learner));
  }

  create(payload: LearnerPayload): Observable<Learner> {
    return this.http.post<{ learner: Learner }>(this.base, payload)
      .pipe(map(response => response.learner));
  }

  update(id: number, payload: Partial<LearnerPayload>): Observable<Learner> {
    return this.http.patch<{ learner: Learner }>(`${this.base}/${id}`, payload)
      .pipe(map(response => response.learner));
  }

  replace(id: number, payload: LearnerPayload): Observable<Learner> {
    return this.http.put<{ learner: Learner }>(`${this.base}/${id}`, payload)
      .pipe(map(response => response.learner));
  }

  deactivate(id: number): Observable<unknown> {
    return this.http.patch(`${this.base}/${id}/deactivate`, {});
  }

  remove(id: number): Observable<unknown> {
    return this.http.delete(`${this.base}/${id}`);
  }
}
