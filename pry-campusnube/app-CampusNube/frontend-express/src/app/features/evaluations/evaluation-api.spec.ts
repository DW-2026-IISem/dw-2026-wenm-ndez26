
import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { environment } from '../../../environments/environment';
import { EvaluationApi } from './evaluation-api';

describe('EvaluationApi', () => {
  let service: EvaluationApi;
  let http: HttpTestingController;
  const url = `${environment.apiUrl}/evaluaciones`;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()],
    });
    service = TestBed.inject(EvaluationApi);
    http = TestBed.inject(HttpTestingController);
  });

  afterEach(() => http.verify());

  it('debe consultar las evaluaciones mediante GET', () => {
    service.list().subscribe();
    const req = http.expectOne(url);
    expect(req.request.method).toBe('GET');
    req.flush({ evaluations: [] });
  });
});
