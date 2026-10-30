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

import { Lesson, LessonPayload } from '../../../core/models/lesson.model';
import { Module } from '../../../core/models/module.model';

@Component({
  selector: 'app-lesson-form',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    ButtonModule,
    InputTextModule,
    TextareaModule,
    SelectModule,
    MessageModule,
  ],
  templateUrl: './lesson-form.html',
  styleUrl: './lesson-form.css',
})
export class LessonForm {
  private readonly fb = inject(FormBuilder);

  readonly lesson = input<Lesson | null>(null);
  readonly modules = input<Module[]>([]);
  readonly saving = input(false);

  readonly saved = output<LessonPayload>();
  readonly cancelled = output<void>();

  readonly form = this.fb.nonNullable.group({
    name: ['', [Validators.required, Validators.maxLength(150)]],
    module_id: [0, [Validators.required, Validators.min(1)]],
    description: [''],
  });

  constructor() {
    effect(() => {
      const current = this.lesson();

      if (current) {
        this.form.reset({
          name: current.name,
          module_id: current.module_id,
          description: current.description ?? '',
        });
      } else {
        this.form.reset({
          name: '',
          module_id: 0,
          description: '',
        });
      }
    });
  }

  submit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const values = this.form.getRawValue();

    const payload: LessonPayload = {
      name: values.name.trim(),
      module_id: Number(values.module_id),
      description: values.description.trim() || null,
      ...(this.lesson() ? {} : { isActive: true }),
    };

    this.saved.emit(payload);
  }

  cancel(): void {
    this.cancelled.emit();
  }
}
