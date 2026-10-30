import {
  Component,
  effect,
  inject,
  input,
  output,
} from '@angular/core';

import {
  FormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { SelectModule } from 'primeng/select';
import { MessageModule } from 'primeng/message';

import {
  Enrollment,
  EnrollmentPayload,
} from '../../../core/models/enrollment.model';

import { Learner } from '../../../core/models/learner.model';
import { Course } from '../../../core/models/course.model';

@Component({
  selector: 'app-enrollment-form',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    ButtonModule,
    InputTextModule,
    SelectModule,
    MessageModule,
  ],
  templateUrl: './enrollment-form.html',
  styleUrl: './enrollment-form.css',
})
export class EnrollmentForm {
  private readonly fb = inject(FormBuilder);

  readonly enrollment = input<Enrollment | null>(null);
  readonly learners = input<Learner[]>([]);
  readonly courses = input<Course[]>([]);
  readonly saving = input(false);

  readonly saved = output<EnrollmentPayload>();
  readonly cancelled = output<void>();

  readonly form = this.fb.nonNullable.group({
    learner_id: [0, [Validators.required, Validators.min(1)]],
    course_id: [0, [Validators.required, Validators.min(1)]],
    enrollment_date: [''],
  });

  constructor() {
    effect(() => {
      const current = this.enrollment();

      this.form.reset({
        learner_id: current?.learner_id ?? 0,
        course_id: current?.course_id ?? 0,
        enrollment_date: current?.enrollment_date
          ? new Date(current.enrollment_date).toISOString().slice(0, 10)
          : new Date().toISOString().slice(0, 10),
      });
    });
  }

  submit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const value = this.form.getRawValue();

    const payload: EnrollmentPayload = {
      learner_id: Number(value.learner_id),
      course_id: Number(value.course_id),
      enrollment_date: value.enrollment_date || undefined,
      ...(this.enrollment() ? {} : { status: 'active' as const }),
    };

    this.saved.emit(payload);
  }

  cancel(): void {
    this.cancelled.emit();
  }
}
