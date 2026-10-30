import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
  inject
} from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';

import { Submission, SubmissionPayload } from '../../../core/models/submission.model';
import { Lesson } from '../../../core/models/lesson.model';
import { Enrollment } from '../../../core/models/enrollment.model';
import { SubmissionApi } from '../submission-api';

import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { SelectModule } from 'primeng/select';
import { TextareaModule } from 'primeng/textarea';
import { MessageModule } from 'primeng/message';
import { TagModule } from 'primeng/tag';

@Component({
  selector: 'app-submission-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ButtonModule,
    InputTextModule,
    SelectModule,
    TextareaModule,
    MessageModule,
    TagModule
  ],
  templateUrl: './submission-form.html',
  styleUrl: './submission-form.css'
})
export class SubmissionForm implements OnChanges {
  private readonly fb = inject(FormBuilder);
  private readonly submissionApi = inject(SubmissionApi);

  @Input() submission: Submission | null = null;
  @Input() lessons: Lesson[] = [];
  @Input() enrollments: Enrollment[] = [];

  @Output() saved = new EventEmitter<void>();
  @Output() cancelled = new EventEmitter<void>();

  saving = false;
  errorMessage = '';

  readonly statusOptions = [
    { label: 'Pendiente', value: 'pendiente' },
    { label: 'En proceso', value: 'en_proceso' },
    { label: 'Completada', value: 'completada' }
  ];

  readonly form = this.fb.group({
    referencia_id: this.fb.control<number | null>(null, [
      Validators.required,
      Validators.min(0)
    ]),
    lesson_id: this.fb.control<number | null>(null, [
      Validators.required,
      Validators.min(1)
    ]),
    enrollment_id: this.fb.control<number | null>(null, [
      Validators.required,
      Validators.min(1)
    ]),
    fecha_inicio: this.fb.control('', Validators.required),
    fecha_fin: this.fb.control(''),
    total: this.fb.control<number | null>(null, [
      Validators.min(0)
    ]),
    estado: this.fb.control('', Validators.required),
    observaciones: this.fb.control('')
  });

  get isEditing(): boolean {
    return this.submission !== null;
  }

  get lessonOptions(): { label: string; value: number }[] {
    return this.lessons.map(lesson => ({
      label: `Lección #${lesson.id} — ${lesson.name}`,
      value: lesson.id
    }));
  }

  get enrollmentOptions(): { label: string; value: number }[] {
    return this.enrollments.map(enrollment => ({
      label: `Inscripción #${enrollment.id} — Aprendiz #${enrollment.learner_id} — Curso #${enrollment.course_id}`,
      value: enrollment.id
    }));
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['submission'] || changes['lessons'] || changes['enrollments']) {
      this.loadForm();
    }
  }

  private toLocalDateTime(value: string | null | undefined): string {
    if (!value) {
      return '';
    }

    const date = new Date(value);

    if (Number.isNaN(date.getTime())) {
      return '';
    }

    const pad = (number: number) => String(number).padStart(2, '0');

    return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}T${pad(date.getHours())}:${pad(date.getMinutes())}`;
  }

  private toIsoDateTime(value: string): string {
    return new Date(value).toISOString();
  }

  private loadForm(): void {
    if (this.submission) {
      this.form.reset({
        referencia_id: this.submission.referencia_id,
        lesson_id: this.submission.lesson_id,
        enrollment_id: this.submission.enrollment_id,
        fecha_inicio: this.toLocalDateTime(this.submission.fecha_inicio),
        fecha_fin: this.toLocalDateTime(this.submission.fecha_fin),
        total:
          this.submission.total === null
            ? null
            : Number(this.submission.total),
        estado: this.submission.estado,
        observaciones: this.submission.observaciones ?? ''
      });

      this.form.controls.estado.disable();
    } else {
      this.form.reset({
        referencia_id: null,
        lesson_id: null,
        enrollment_id: null,
        fecha_inicio: '',
        fecha_fin: '',
        total: null,
        estado: '',
        observaciones: ''
      });

      this.form.controls.estado.enable();
    }

    this.errorMessage = '';
  }

  submit(): void {
    if (this.form.invalid || this.saving) {
      this.form.markAllAsTouched();
      return;
    }

    const value = this.form.getRawValue();

    if (
      value.referencia_id === null ||
      value.lesson_id === null ||
      value.enrollment_id === null ||
      !value.fecha_inicio
    ) {
      this.form.markAllAsTouched();
      return;
    }

    this.saving = true;
    this.errorMessage = '';

    const payload: SubmissionPayload = {
      referencia_id: value.referencia_id,
      lesson_id: value.lesson_id,
      enrollment_id: value.enrollment_id,
      fecha_inicio: this.toIsoDateTime(value.fecha_inicio),
      fecha_fin: value.fecha_fin
        ? this.toIsoDateTime(value.fecha_fin)
        : null,
      total: value.total === null ? null : value.total,
      estado: value.estado ?? '',
      observaciones: value.observaciones?.trim() || null
    };

    if (this.submission) {
      const updatePayload = {
        referencia_id: payload.referencia_id,
        lesson_id: payload.lesson_id,
        enrollment_id: payload.enrollment_id,
        fecha_inicio: payload.fecha_inicio,
        fecha_fin: payload.fecha_fin,
        total: payload.total,
        observaciones: payload.observaciones
      };

      this.submissionApi.update(this.submission.id, updatePayload).subscribe({
        next: () => {
          this.saving = false;
          this.saved.emit();
        },
        error: error => {
          this.saving = false;
          this.errorMessage =
            error?.error?.message ?? 'No fue posible actualizar la entrega.';
        }
      });

      return;
    }

    this.submissionApi.create(payload).subscribe({
      next: () => {
        this.saving = false;
        this.saved.emit();
      },
      error: error => {
        this.saving = false;
        this.errorMessage =
          error?.error?.message ?? 'No fue posible registrar la entrega.';
      }
    });
  }

  cancel(): void {
    this.cancelled.emit();
  }
}
