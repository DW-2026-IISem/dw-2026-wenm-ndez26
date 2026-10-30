import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, map } from 'rxjs';

import { environment } from '../../../environments/environment';
import { Module, ModulePayload } from '../../core/models/module.model';

@Injectable({ providedIn: 'root' })
export class ModuleApi {

  private readonly http = inject(HttpClient);
  private readonly base = `${environment.apiUrl}/modulos`;

  list(): Observable<Module[]> {
    return this.http.get<{ modules: Module[] }>(this.base)
      .pipe(map(response => response.modules));
  }

  get(id: number): Observable<Module> {
    return this.http.get<{ module: Module }>(`${this.base}/${id}`)
      .pipe(map(response => response.module));
  }

  create(payload: ModulePayload): Observable<Module> {
    return this.http.post<{ module: Module }>(this.base, payload)
      .pipe(map(response => response.module));
  }

  update(id: number, payload: Partial<ModulePayload>): Observable<Module> {
    return this.http.patch<{ module: Module }>(`${this.base}/${id}`, payload)
      .pipe(map(response => response.module));
  }

  replace(id: number, payload: ModulePayload): Observable<Module> {
    return this.http.put<{ module: Module }>(`${this.base}/${id}`, payload)
      .pipe(map(response => response.module));
  }

  deactivate(id: number): Observable<unknown> {
    return this.http.patch(`${this.base}/${id}/deactivate`, {});
  }

  remove(id: number): Observable<unknown> {
    return this.http.delete(`${this.base}/${id}`);
  }
}
