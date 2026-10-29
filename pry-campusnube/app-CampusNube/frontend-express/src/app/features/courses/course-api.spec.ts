
import { provideHttpClient } from '@angular/common/http';
import {
  HttpTestingController,
  provideHttpClientTesting,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { environment } from '../../../environments/environment';
import { CourseApi } from './course-api';

describe('CourseApi', () => {
  let service: CourseApi;
  let http: HttpTestingController;

  const url = `${environment.apiUrl}/cursos`;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
      ],
    });

    service = TestBed.inject(CourseApi);
    http = TestBed.inject(HttpTestingController);
  });

  afterEach(() => http.verify());

  it('debe consultar los cursos mediante GET', () => {
    service.list().subscribe();

    const req = http.expectOne(url);

    expect(req.request.method).toBe('GET');
    req.flush({ courses: [] });
  });
});
