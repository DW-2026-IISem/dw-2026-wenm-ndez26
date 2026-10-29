
import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, map } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Certificate, CertificatePayload } from '../../core/models/certificate.model';

@Injectable({ providedIn: 'root' })
export class CertificateApi {
  private readonly http = inject(HttpClient);
  private readonly base = `${environment.apiUrl}/certificates`;

  list(): Observable<Certificate[]> {
    return this.http.get<{ certificates: Certificate[] }>(this.base)
      .pipe(map(response => response.certificates));
  }

  get(id: number): Observable<Certificate> {
    return this.http.get<{ certificate: Certificate }>(`${this.base}/${id}`)
      .pipe(map(response => response.certificate));
  }

  create(payload: CertificatePayload): Observable<Certificate> {
    return this.http.post<{ certificate: Certificate }>(this.base, payload)
      .pipe(map(response => response.certificate));
  }

  update(id: number, payload: Partial<CertificatePayload>): Observable<Certificate> {
    return this.http.patch<{ certificate: Certificate }>(`${this.base}/${id}`, payload)
      .pipe(map(response => response.certificate));
  }

  replace(id: number, payload: CertificatePayload): Observable<Certificate> {
    return this.http.put<{ certificate: Certificate }>(`${this.base}/${id}`, payload)
      .pipe(map(response => response.certificate));
  }

  remove(id: number): Observable<unknown> {
    return this.http.delete(`${this.base}/${id}`);
  }
}
