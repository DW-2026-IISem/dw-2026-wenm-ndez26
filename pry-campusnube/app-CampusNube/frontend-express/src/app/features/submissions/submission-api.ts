import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, map } from 'rxjs';
import { environment } from '../../../environments/environment';
import {
  Submission,
  SubmissionPayload
} from '../../core/models/submission.model';

interface SubmissionListResponse {
  submissions: Submission[];
}

interface SubmissionResponse {
  submission: Submission;
}

@Injectable({
  providedIn: 'root'
})
export class SubmissionApi {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = `${environment.apiUrl}/entregas`;

  list(): Observable<Submission[]> {
    return this.http
      .get<SubmissionListResponse>(this.baseUrl)
      .pipe(map(response => response.submissions ?? []));
  }

  get(id: number): Observable<Submission> {
    return this.http
      .get<SubmissionResponse>(`${this.baseUrl}/${id}`)
      .pipe(map(response => response.submission));
  }

  create(payload: SubmissionPayload): Observable<Submission> {
    return this.http
      .post<SubmissionResponse>(this.baseUrl, payload)
      .pipe(map(response => response.submission));
  }

  update(
    id: number,
    payload: Partial<SubmissionPayload>
  ): Observable<Submission> {
    return this.http
      .patch<SubmissionResponse>(`${this.baseUrl}/${id}`, payload)
      .pipe(map(response => response.submission));
  }

  replace(
    id: number,
    payload: SubmissionPayload
  ): Observable<Submission> {
    return this.http
      .put<SubmissionResponse>(`${this.baseUrl}/${id}`, payload)
      .pipe(map(response => response.submission));
  }

  deactivate(id: number): Observable<unknown> {
    return this.http.patch(`${this.baseUrl}/${id}/deactivate`, {});
  }

  remove(id: number): Observable<unknown> {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }
}
