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
import { TextareaModule } from 'primeng/textarea';
import { SelectModule } from 'primeng/select';
import { MessageModule } from 'primeng/message';

import { Progress, ProgressPayload } from '../../../core/models/progress.model';
import { Enrollment } from '../../../core/models/enrollment.model';

import { ProgressApi } from '../progress-api';

@Component({
  selector: 'app-progress-form',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    ButtonModule,
    InputTextModule,
    TextareaModule,
    SelectModule,
    MessageModule,
  ],
  templateUrl: './progress-form.html',
  styleUrl: './progress-form.css',
})
export class ProgressForm implements OnChanges {
  private readonly fb = inject(FormBuilder);
  private readonly api = inject(ProgressApi);

  @Input() progress: Progress | null = null;
  @Input() enrollments: Enrollment[] = [];

  @Output() saved = new EventEmitter<void>();
  @Output() cancelled = new EventEmitter<void>();

  loading = false;
  errorMessage = '';

  form = this.fb.nonNullable.group({
    enrollment_id: [0, [Validators.required, Validators.min(1)]],
    name: ['', [Validators.required, Validators.maxLength(150)]],
    description: [''],
  });

  get enrollmentOptions() {
    return this.enrollments.map((enrollment) => ({
      id: enrollment.id,
      label: `Inscripción #${enrollment.id} — Curso #${enrollment.course_id} — Aprendiz #${enrollment.learner_id}`,
    }));
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['progress']) {
      if (this.progress) {
        this.form.patchValue({
          enrollment_id: this.progress.enrollment_id,
          name: this.progress.name,
          description: this.progress.description ?? '',
        });
      } else {
        this.form.reset({
          enrollment_id: 0,
          name: '',
          description: '',
        });
      }
    }
  }

  submit(): void {
    if (this.form.invalid || this.loading) {
      this.form.markAllAsTouched();
      return;
    }

    const value = this.form.getRawValue();

    const payload: ProgressPayload = {
      enrollment_id: Number(value.enrollment_id),
      name: value.name.trim(),
      description: value.description.trim() || null,
    };

    this.loading = true;

    const request = this.progress
      ? this.api.update(this.progress.id, payload)
      : this.api.create(payload);

    request.subscribe({
      next: () => {
        this.loading = false;
        this.saved.emit();
      },
      error: () => {
        this.loading = false;
      },
    });
  }

  cancel(): void {
    this.cancelled.emit();
  }
}
