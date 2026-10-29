
import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, map } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Course, CoursePayload } from '../../core/models/course.model';

@Injectable({ providedIn: 'root' })
export class CourseApi {
  private readonly http = inject(HttpClient);
  private readonly base = `${environment.apiUrl}/cursos`;

  list(): Observable<Course[]> {
    return this.http.get<{ courses: Course[] }>(this.base)
      .pipe(map(response => response.courses));
  }

  get(id: number): Observable<Course> {
    return this.http.get<{ course: Course }>(`${this.base}/${id}`)
      .pipe(map(response => response.course));
  }

  create(payload: CoursePayload): Observable<Course> {
    return this.http.post<{ course: Course }>(this.base, payload)
      .pipe(map(response => response.course));
  }

  update(id: number, payload: Partial<CoursePayload>): Observable<Course> {
    return this.http.patch<{ course: Course }>(`${this.base}/${id}`, payload)
      .pipe(map(response => response.course));
  }

  replace(id: number, payload: CoursePayload): Observable<Course> {
    return this.http.put<{ course: Course }>(`${this.base}/${id}`, payload)
      .pipe(map(response => response.course));
  }

  deactivate(id: number): Observable<unknown> {
    return this.http.patch(`${this.base}/${id}/deactivate`, {});
  }

  remove(id: number): Observable<unknown> {
    return this.http.delete(`${this.base}/${id}`);
  }
}
