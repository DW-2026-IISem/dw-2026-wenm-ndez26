import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from '../../../environments/environment';
import {
  Certificate,
  CertificatePayload,
} from '../../core/models/certificate.model';

@Injectable({
  providedIn: 'root',
})
export class CertificateApi {
  private readonly http = inject(HttpClient);

  private readonly base = `${environment.apiUrl}/certificates`;

  list(): Observable<Certificate[]> {
    return this.http.get<Certificate[]>(this.base);
  }

  get(id: number): Observable<Certificate> {
    return this.http.get<Certificate>(`${this.base}/${id}`);
  }

  create(payload: CertificatePayload): Observable<Certificate> {
    return this.http.post<Certificate>(this.base, payload);
  }

  update(
    id: number,
    payload: Partial<CertificatePayload>,
  ): Observable<Certificate> {
    return this.http.patch<Certificate>(
      `${this.base}/${id}`,
      payload,
    );
  }

  replace(
    id: number,
    payload: CertificatePayload,
  ): Observable<Certificate> {
    return this.http.put<Certificate>(
      `${this.base}/${id}`,
      payload,
    );
  }

  deactivate(id: number): Observable<Certificate> {
    return this.http.patch<Certificate>(
      `${this.base}/${id}/deactivate`,
      {},
    );
  }

  remove(id: number): Observable<unknown> {
    return this.http.delete(`${this.base}/${id}`);
  }
}
