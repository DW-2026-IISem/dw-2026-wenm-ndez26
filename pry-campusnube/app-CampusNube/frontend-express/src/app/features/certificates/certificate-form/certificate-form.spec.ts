import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';

import { CertificateForm } from './certificate-form';
import { CertificateApi } from '../certificate-api';

describe('CertificateForm', () => {
  let fixture: ComponentFixture<CertificateForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CertificateForm],
      providers: [
        {
          provide: CertificateApi,
          useValue: {
            create: () => of({}),
            update: () => of({}),
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(CertificateForm);
    fixture.detectChanges();
  });

  it('debe crear el componente de formulario', () => {
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('debe iniciar con los campos vacíos', () => {
    expect(fixture.componentInstance.form.controls.name.value).toBe('');
    expect(
      fixture.componentInstance.form.controls.enrollment_id.value,
    ).toBeNull();
  });

  it('debe validar los campos obligatorios', () => {
    expect(fixture.componentInstance.form.invalid).toBe(true);
  });
});
