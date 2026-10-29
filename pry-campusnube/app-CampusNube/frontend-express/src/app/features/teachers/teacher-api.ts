
import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, map } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Teacher, TeacherPayload } from '../../core/models/teacher.model';

@Injectable({ providedIn: 'root' })
export class TeacherApi {
  private readonly http = inject(HttpClient);
  private readonly base = `${environment.apiUrl}/docentes`;

  list(): Observable<Teacher[]> {
    return this.http.get<{ teachers: Teacher[] }>(this.base)
      .pipe(map(response => response.teachers));
  }

  get(id: number): Observable<Teacher> {
    return this.http.get<{ teacher: Teacher }>(`${this.base}/${id}`)
      .pipe(map(response => response.teacher));
  }

  create(payload: TeacherPayload): Observable<Teacher> {
    return this.http.post<{ teacher: Teacher }>(this.base, payload)
      .pipe(map(response => response.teacher));
  }

  update(id: number, payload: Partial<TeacherPayload>): Observable<Teacher> {
    return this.http.patch<{ teacher: Teacher }>(`${this.base}/${id}`, payload)
      .pipe(map(response => response.teacher));
  }

  replace(id: number, payload: TeacherPayload): Observable<Teacher> {
    return this.http.put<{ teacher: Teacher }>(`${this.base}/${id}`, payload)
      .pipe(map(response => response.teacher));
  }

  deactivate(id: number): Observable<unknown> {
    return this.http.patch(`${this.base}/${id}/deactivate`, {});
  }

  remove(id: number): Observable<unknown> {
    return this.http.delete(`${this.base}/${id}`);
  }
}
