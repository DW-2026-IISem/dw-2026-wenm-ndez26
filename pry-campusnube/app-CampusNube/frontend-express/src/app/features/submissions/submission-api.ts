
import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, map } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Submission, SubmissionPayload } from '../../core/models/submission.model';

@Injectable({ providedIn: 'root' })
export class SubmissionApi {
  private readonly http = inject(HttpClient);
  private readonly base = `${environment.apiUrl}/entregas`;

  list(): Observable<Submission[]> {
    return this.http.get<{ submissions: Submission[] }>(this.base)
      .pipe(map(response => response.submissions));
  }

  get(id: number): Observable<Submission> {
    return this.http.get<{ submission: Submission }>(`${this.base}/${id}`)
      .pipe(map(response => response.submission));
  }

  create(payload: SubmissionPayload): Observable<Submission> {
    return this.http.post<{ submission: Submission }>(this.base, payload)
      .pipe(map(response => response.submission));
  }

  update(id: number, payload: Partial<SubmissionPayload>): Observable<Submission> {
    return this.http.patch<{ submission: Submission }>(`${this.base}/${id}`, payload)
      .pipe(map(response => response.submission));
  }

  replace(id: number, payload: SubmissionPayload): Observable<Submission> {
    return this.http.put<{ submission: Submission }>(`${this.base}/${id}`, payload)
      .pipe(map(response => response.submission));
  }

  deactivate(id: number): Observable<unknown> {
    return this.http.patch(`${this.base}/${id}/deactivate`, {});
  }

  remove(id: number): Observable<unknown> {
    return this.http.delete(`${this.base}/${id}`);
  }
}
