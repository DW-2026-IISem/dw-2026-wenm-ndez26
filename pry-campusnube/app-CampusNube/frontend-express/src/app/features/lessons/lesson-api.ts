import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, map } from 'rxjs';

import { environment } from '../../../environments/environment';
import { Lesson, LessonPayload } from '../../core/models/lesson.model';

@Injectable({ providedIn: 'root' })
export class LessonApi {
  private readonly http = inject(HttpClient);
  private readonly base = `${environment.apiUrl}/lecciones`;

  list(): Observable<Lesson[]> {
    return this.http.get<Lesson[] | { lessons: Lesson[] }>(this.base).pipe(
      map((response) =>
        Array.isArray(response) ? response : response.lessons,
      ),
    );
  }

  get(id: number): Observable<Lesson> {
    return this.http.get<Lesson | { lesson: Lesson }>(`${this.base}/${id}`).pipe(
      map((response) =>
        'lesson' in response ? response.lesson : response,
      ),
    );
  }

  create(payload: LessonPayload): Observable<Lesson> {
    return this.http.post<Lesson | { lesson: Lesson }>(this.base, payload).pipe(
      map((response) =>
        'lesson' in response ? response.lesson : response,
      ),
    );
  }

  update(id: number, payload: Partial<LessonPayload>): Observable<Lesson> {
    return this.http.patch<Lesson | { lesson: Lesson }>(
      `${this.base}/${id}`,
      payload,
    ).pipe(
      map((response) =>
        'lesson' in response ? response.lesson : response,
      ),
    );
  }

  replace(id: number, payload: LessonPayload): Observable<Lesson> {
    return this.http.put<Lesson | { lesson: Lesson }>(
      `${this.base}/${id}`,
      payload,
    ).pipe(
      map((response) =>
        'lesson' in response ? response.lesson : response,
      ),
    );
  }

  deactivate(id: number): Observable<unknown> {
    return this.http.patch(`${this.base}/${id}/deactivate`, {});
  }

  remove(id: number): Observable<unknown> {
    return this.http.delete(`${this.base}/${id}`);
  }
}
