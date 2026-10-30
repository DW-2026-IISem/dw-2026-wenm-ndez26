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

import { Attempt, AttemptPayload } from '../../../core/models/attempt.model';
import { Enrollment } from '../../../core/models/enrollment.model';
import { AttemptApi } from '../attempt-api';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-attempt-form',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    ButtonModule,
    InputTextModule,
    TextareaModule,
    SelectModule,
    MessageModule,
  ],
  templateUrl: './attempt-form.html',
  styleUrl: './attempt-form.css',
})
export class AttemptForm implements OnChanges {
  private readonly fb = inject(FormBuilder);
  private readonly api = inject(AttemptApi);
  private readonly messages = inject(MessageService);

  @Input() attempt: Attempt | null = null;
  @Input() enrollments: Enrollment[] = [];

  @Output() saved = new EventEmitter<void>();
  @Output() cancelled = new EventEmitter<void>();

  loading = false;

  form = this.fb.nonNullable.group({
    enrollment_id: [0, [Validators.required, Validators.min(1)]],
    name: ['', [Validators.required, Validators.maxLength(150)]],
    description: [''],
  });

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['attempt']) {
      if (this.attempt) {
        this.form.patchValue({
          enrollment_id: this.attempt.enrollment_id,
          name: this.attempt.name,
          description: this.attempt.description ?? '',
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

  get enrollmentOptions() {
    return this.enrollments.map((enrollment) => ({
      id: enrollment.id,
      label: `Inscripción #${enrollment.id} — Curso #${enrollment.course_id} — Aprendiz #${enrollment.learner_id}`,
    }));
  }

  submit(): void {
    if (this.form.invalid || this.loading) {
      this.form.markAllAsTouched();
      return;
    }

    const value = this.form.getRawValue();

    const payload: AttemptPayload = {
      enrollment_id: Number(value.enrollment_id),
      name: value.name.trim(),
      description: value.description.trim() || null,
    };

    this.loading = true;

    const request = this.attempt
      ? this.api.update(this.attempt.id, payload)
      : this.api.create(payload);

    request.subscribe({
      next: () => {
        this.loading = false;
        this.messages.add({
          severity: 'success',
          summary: 'Correcto',
          detail: this.attempt
            ? 'Intento actualizado correctamente'
            : 'Intento creado correctamente',
        });
        this.saved.emit();
      },
      error: (error) => {
        this.loading = false;
        this.messages.add({
          severity: 'error',
          summary: 'Error',
          detail: error?.error?.error ?? 'No fue posible guardar el intento',
        });
      },
    });
  }

  cancel(): void {
    this.cancelled.emit();
  }
}
