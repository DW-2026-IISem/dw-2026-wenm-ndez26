import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, map } from 'rxjs';

import { environment } from '../../../environments/environment';

import {
  Evaluation,
  EvaluationPayload,
} from '../../core/models/evaluation.model';

@Injectable({ providedIn: 'root' })
export class EvaluationApi {
  private readonly http = inject(HttpClient);
  private readonly base = `${environment.apiUrl}/evaluaciones`;

  list(): Observable<Evaluation[]> {
    return this.http
      .get<{ evaluations: Evaluation[] }>(this.base)
      .pipe(map((response) => response.evaluations));
  }

  get(id: number): Observable<Evaluation> {
    return this.http
      .get<{ evaluation: Evaluation }>(`${this.base}/${id}`)
      .pipe(map((response) => response.evaluation));
  }

  create(payload: EvaluationPayload): Observable<Evaluation> {
    return this.http
      .post<{ evaluation: Evaluation }>(this.base, payload)
      .pipe(map((response) => response.evaluation));
  }

  update(
    id: number,
    payload: Partial<EvaluationPayload>,
  ): Observable<Evaluation> {
    return this.http
      .patch<{ evaluation: Evaluation }>(`${this.base}/${id}`, payload)
      .pipe(map((response) => response.evaluation));
  }

  replace(id: number, payload: EvaluationPayload): Observable<Evaluation> {
    return this.http
      .put<{ evaluation: Evaluation }>(`${this.base}/${id}`, payload)
      .pipe(map((response) => response.evaluation));
  }

  deactivate(id: number): Observable<unknown> {
    return this.http.patch(`${this.base}/${id}/deactivate`, {});
  }

  remove(id: number): Observable<unknown> {
    return this.http.delete(`${this.base}/${id}`);
  }
}
