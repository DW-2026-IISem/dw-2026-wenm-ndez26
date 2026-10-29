
import { provideHttpClient } from '@angular/common/http';
import {
  HttpTestingController,
  provideHttpClientTesting,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { environment } from '../../../environments/environment';
import { TeacherApi } from './teacher-api';

describe('TeacherApi', () => {
  let service: TeacherApi;
  let http: HttpTestingController;

  const url = `${environment.apiUrl}/docentes`;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
      ],
    });

    service = TestBed.inject(TeacherApi);
    http = TestBed.inject(HttpTestingController);
  });

  afterEach(() => http.verify());

  it('debe consultar los docentes mediante GET', () => {
    service.list().subscribe();

    const req = http.expectOne(url);

    expect(req.request.method).toBe('GET');
    req.flush({ teachers: [] });
  });
});
