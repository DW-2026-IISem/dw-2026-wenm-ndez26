
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
    return this.http.get<{ lessons: Lesson[] }>(this.base)
      .pipe(map(response => response.lessons));
  }

  get(id: number): Observable<Lesson> {
    return this.http.get<{ lesson: Lesson }>(`${this.base}/${id}`)
      .pipe(map(response => response.lesson));
  }

  create(payload: LessonPayload): Observable<Lesson> {
    return this.http.post<{ lesson: Lesson }>(this.base, payload)
      .pipe(map(response => response.lesson));
  }

  update(id: number, payload: Partial<LessonPayload>): Observable<Lesson> {
    return this.http.patch<{ lesson: Lesson }>(`${this.base}/${id}`, payload)
      .pipe(map(response => response.lesson));
  }

  replace(id: number, payload: LessonPayload): Observable<Lesson> {
    return this.http.put<{ lesson: Lesson }>(`${this.base}/${id}`, payload)
      .pipe(map(response => response.lesson));
  }

  deactivate(id: number): Observable<unknown> {
    return this.http.patch(`${this.base}/${id}/deactivate`, {});
  }

  remove(id: number): Observable<unknown> {
    return this.http.delete(`${this.base}/${id}`);
  }
}
