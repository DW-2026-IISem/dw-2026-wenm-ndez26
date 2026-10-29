
import { provideHttpClient } from '@angular/common/http';
import {
  HttpTestingController,
  provideHttpClientTesting,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { environment } from '../../../environments/environment';
import { LearnerApi } from './learner-api';

describe('LearnerApi', () => {
  let service: LearnerApi;
  let http: HttpTestingController;

  const url = `${environment.apiUrl}/aprendices`;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
      ],
    });

    service = TestBed.inject(LearnerApi);
    http = TestBed.inject(HttpTestingController);
  });

  afterEach(() => http.verify());

  it('debe consultar los aprendices mediante GET', () => {
    service.list().subscribe();

    const req = http.expectOne(url);

    expect(req.request.method).toBe('GET');
    req.flush({ learners: [] });
  });
});
