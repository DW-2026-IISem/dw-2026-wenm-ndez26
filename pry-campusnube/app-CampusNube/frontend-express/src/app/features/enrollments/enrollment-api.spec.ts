
import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { environment } from '../../../environments/environment';
import { EnrollmentApi } from './enrollment-api';

describe('EnrollmentApi', () => {
  let service: EnrollmentApi;
  let http: HttpTestingController;
  const url = `${environment.apiUrl}/inscripciones`;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()],
    });
    service = TestBed.inject(EnrollmentApi);
    http = TestBed.inject(HttpTestingController);
  });

  afterEach(() => http.verify());

  it('debe consultar las inscripciones mediante GET', () => {
    service.list().subscribe();
    const req = http.expectOne(url);
    expect(req.request.method).toBe('GET');
    req.flush({ enrollments: [] });
  });
});
