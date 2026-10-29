
import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { environment } from '../../../environments/environment';
import { ModuleApi } from './module-api';

describe('ModuleApi', () => {
  let service: ModuleApi;
  let http: HttpTestingController;
  const url = `${environment.apiUrl}/modulos`;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()],
    });
    service = TestBed.inject(ModuleApi);
    http = TestBed.inject(HttpTestingController);
  });

  afterEach(() => http.verify());

  it('debe consultar los módulos mediante GET', () => {
    service.list().subscribe();
    const req = http.expectOne(url);
    expect(req.request.method).toBe('GET');
    req.flush({ modules: [] });
  });
});
