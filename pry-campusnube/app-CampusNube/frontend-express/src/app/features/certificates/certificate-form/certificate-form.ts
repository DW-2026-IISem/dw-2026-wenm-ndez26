import { CommonModule } from '@angular/common';
import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
  inject,
} from '@angular/core';

import {
  FormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { MessageModule } from 'primeng/message';
import { SelectModule } from 'primeng/select';
import { TextareaModule } from 'primeng/textarea';

import {
  Certificate,
  CertificatePayload,
} from '../../../core/models/certificate.model';

import { Enrollment } from '../../../core/models/enrollment.model';
import { CertificateApi } from '../certificate-api';

@Component({
  selector: 'app-certificate-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ButtonModule,
    InputTextModule,
    MessageModule,
    SelectModule,
    TextareaModule,
  ],
  templateUrl: './certificate-form.html',
  styleUrl: './certificate-form.css',
})
export class CertificateForm implements OnChanges {
  private readonly fb = inject(FormBuilder);
  private readonly api = inject(CertificateApi);

  @Input() certificate: Certificate | null = null;
  @Input() enrollments: Enrollment[] = [];
  @Input() certificates: Certificate[] = [];

  @Output() saved = new EventEmitter<void>();
  @Output() cancelled = new EventEmitter<void>();

  loading = false;
  errorMessage = '';

  readonly form = this.fb.group({
    enrollment_id: [null as number | null, Validators.required],
    name: ['', [Validators.required, Validators.maxLength(255)]],
    description: [''],
  });

  get enrollmentOptions(): { label: string; value: number }[] {
    return this.enrollments
      .filter((enrollment) => {
        if (enrollment.status !== 'active') {
          return false;
        }

        return !this.certificates.some(
          (certificate) =>
            certificate.enrollment_id === enrollment.id &&
            certificate.id !== this.certificate?.id,
        );
      })
      .map((enrollment) => ({
        label: `Inscripción #${enrollment.id} — Curso #${enrollment.course_id} — Aprendiz #${enrollment.learner_id}`,
        value: enrollment.id,
      }));
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['certificate']) {
      if (this.certificate) {
        this.form.reset({
          enrollment_id: this.certificate.enrollment_id,
          name: this.certificate.name,
          description: this.certificate.description ?? '',
        });
      } else {
        this.form.reset({
          enrollment_id: null,
          name: '',
          description: '',
        });
      }

      this.errorMessage = '';
    }
  }

  submit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const value = this.form.getRawValue();

    if (value.enrollment_id === null) {
      this.errorMessage = 'Debes seleccionar una inscripción.';
      return;
    }

    const payload: CertificatePayload = {
      enrollment_id: value.enrollment_id,
      name: value.name!.trim(),
      description: value.description?.trim() || null,
    };

    if (!payload.name) {
      this.form.controls.name.setErrors({ required: true });
      return;
    }

    this.loading = true;
    this.errorMessage = '';

    const request = this.certificate
      ? this.api.update(this.certificate.id, payload)
      : this.api.create(payload);

    request.subscribe({
      next: () => {
        this.loading = false;
        this.saved.emit();
      },
      error: (error) => {
        this.loading = false;
        this.errorMessage =
          error?.error?.message ||
          error?.error?.error ||
          'No fue posible guardar el certificado. Verifica los datos de la inscripción.';
      },
    });
  }

  cancel(): void {
    this.cancelled.emit();
  }
}
