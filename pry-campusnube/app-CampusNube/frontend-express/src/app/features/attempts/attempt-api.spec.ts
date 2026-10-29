
import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { environment } from '../../../environments/environment';
import { AttemptApi } from './attempt-api';

describe('AttemptApi', () => {
  let service: AttemptApi;
  let http: HttpTestingController;
  const url = `${environment.apiUrl}/intentos`;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()],
    });
    service = TestBed.inject(AttemptApi);
    http = TestBed.inject(HttpTestingController);
  });

  afterEach(() => http.verify());

  it('debe consultar los intentos mediante GET', () => {
    service.list().subscribe();
    const req = http.expectOne(url);
    expect(req.request.method).toBe('GET');
    req.flush({ attempts: [] });
  });
});
