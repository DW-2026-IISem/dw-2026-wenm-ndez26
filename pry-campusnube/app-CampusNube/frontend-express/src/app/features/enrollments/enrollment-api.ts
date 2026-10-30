import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, map } from 'rxjs';

import { environment } from '../../../environments/environment';

import {
  Enrollment,
  EnrollmentPayload,
} from '../../core/models/enrollment.model';

@Injectable({ providedIn: 'root' })
export class EnrollmentApi {
  private readonly http = inject(HttpClient);
  private readonly base = `${environment.apiUrl}/inscripciones`;

  list(): Observable<Enrollment[]> {
    return this.http
      .get<{ enrollments: Enrollment[] }>(this.base)
      .pipe(map((response) => response.enrollments));
  }

  get(id: number): Observable<Enrollment> {
    return this.http
      .get<{ enrollment: Enrollment }>(`${this.base}/${id}`)
      .pipe(map((response) => response.enrollment));
  }

  create(payload: EnrollmentPayload): Observable<Enrollment> {
    return this.http
      .post<{ enrollment: Enrollment }>(this.base, payload)
      .pipe(map((response) => response.enrollment));
  }

  update(
    id: number,
    payload: Partial<EnrollmentPayload>,
  ): Observable<Enrollment> {
    return this.http
      .patch<{ enrollment: Enrollment }>(`${this.base}/${id}`, payload)
      .pipe(map((response) => response.enrollment));
  }

  replace(id: number, payload: EnrollmentPayload): Observable<Enrollment> {
    return this.http
      .put<{ enrollment: Enrollment }>(`${this.base}/${id}`, payload)
      .pipe(map((response) => response.enrollment));
  }

  deactivate(id: number): Observable<unknown> {
    return this.http.patch(`${this.base}/${id}/deactivate`, {});
  }

  remove(id: number): Observable<unknown> {
    return this.http.delete(`${this.base}/${id}`);
  }
}
