import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';

import { CertificateList } from './certificate-list';
import { CertificateApi } from '../certificate-api';
import { EnrollmentApi } from '../../enrollments/enrollment-api';

describe('CertificateList', () => {
  let fixture: ComponentFixture<CertificateList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CertificateList],
      providers: [
        {
          provide: CertificateApi,
          useValue: {
            list: () => of([]),
            deactivate: () => of({}),
            remove: () => of({}),
          },
        },
        {
          provide: EnrollmentApi,
          useValue: {
            list: () => of([]),
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(CertificateList);
    fixture.detectChanges();
  });

  it('debe crear el componente de listado', () => {
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('debe iniciar sin certificados', () => {
    expect(fixture.componentInstance.certificates()).toEqual([]);
  });

  it('debe iniciar sin inscripciones cargadas', () => {
    expect(fixture.componentInstance.enrollments()).toEqual([]);
  });

  it('debe calcular cero certificados activos inicialmente', () => {
    expect(fixture.componentInstance.activeCount()).toBe(0);
  });

  it('debe iniciar con la búsqueda vacía', () => {
    expect(fixture.componentInstance.filteredCertificates()).toEqual([]);
  });
});
