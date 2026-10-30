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
import { TextareaModule } from 'primeng/textarea';
import { SelectModule } from 'primeng/select';
import { MessageModule } from 'primeng/message';

import {
  Evaluation,
  EvaluationPayload,
} from '../../../core/models/evaluation.model';

import { Course } from '../../../core/models/course.model';

@Component({
  selector: 'app-evaluation-form',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    ButtonModule,
    InputTextModule,
    TextareaModule,
    SelectModule,
    MessageModule,
  ],
  templateUrl: './evaluation-form.html',
  styleUrl: './evaluation-form.css',
})
export class EvaluationForm {
  private readonly fb = inject(FormBuilder);

  readonly evaluation = input<Evaluation | null>(null);
  readonly courses = input<Course[]>([]);
  readonly saving = input(false);

  readonly saved = output<EvaluationPayload>();
  readonly cancelled = output<void>();

  readonly form = this.fb.nonNullable.group({
    name: ['', [Validators.required, Validators.maxLength(150)]],
    course_id: [0, [Validators.required, Validators.min(1)]],
    description: [''],
  });

  constructor() {
    effect(() => {
      const current = this.evaluation();

      this.form.reset({
        name: current?.name ?? '',
        course_id: current?.course_id ?? 0,
        description: current?.description ?? '',
      });
    });
  }

  submit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const value = this.form.getRawValue();

    const payload: EvaluationPayload = {
      name: value.name.trim(),
      course_id: Number(value.course_id),
      description: value.description.trim() || null,
      ...(this.evaluation() ? {} : { isActive: true }),
    };

    this.saved.emit(payload);
  }

  cancel(): void {
    this.cancelled.emit();
  }
}
