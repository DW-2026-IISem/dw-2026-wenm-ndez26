import { provideHttpClient } from '@angular/common/http';
import {
  HttpTestingController,
  provideHttpClientTesting,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { environment } from '../../../environments/environment';
import { AttemptApi } from './attempt-api';

describe('AttemptApi', () => {
  let service: AttemptApi;
  let http: HttpTestingController;

  const url = `${environment.apiUrl}/intentos`;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
      ],
    });

    service = TestBed.inject(AttemptApi);
    http = TestBed.inject(HttpTestingController);
  });

  afterEach(() => http.verify());

  it('debe consultar los intentos mediante GET', () => {
    service.list().subscribe((attempts) => {
      expect(attempts).toEqual([]);
    });

    const request = http.expectOne(url);

    expect(request.request.method).toBe('GET');

    request.flush([]);
  });

  it('debe crear un intento mediante POST', () => {
    const payload = {
      enrollment_id: 1,
      name: 'Intento diagnóstico',
      description: 'Primera evaluación',
    };

    service.create(payload).subscribe((attempt) => {
      expect(attempt.id).toBe(1);
      expect(attempt.name).toBe('Intento diagnóstico');
    });

    const request = http.expectOne(url);

    expect(request.request.method).toBe('POST');
    expect(request.request.body).toEqual(payload);

    request.flush({
      id: 1,
      enrollment_id: 1,
      name: 'Intento diagnóstico',
      description: 'Primera evaluación',
      isActive: true,
    });
  });
});
