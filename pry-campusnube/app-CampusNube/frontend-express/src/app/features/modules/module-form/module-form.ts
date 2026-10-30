import {
  Component,
  effect,
  inject,
  input,
  output
} from '@angular/core';

import {
  FormBuilder,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';

import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { TextareaModule } from 'primeng/textarea';
import { SelectModule } from 'primeng/select';
import { MessageModule } from 'primeng/message';

import { Module, ModulePayload } from '../../../core/models/module.model';
import { Course } from '../../../core/models/course.model';

@Component({
  selector: 'app-module-form',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    ButtonModule,
    InputTextModule,
    TextareaModule,
    SelectModule,
    MessageModule
  ],
  templateUrl: './module-form.html',
  styleUrl: './module-form.css',
})
export class ModuleForm {

  private readonly fb = inject(FormBuilder);

  readonly module = input<Module | null>(null);
  readonly courses = input<Course[]>([]);
  readonly saving = input(false);

  readonly saved = output<ModulePayload>();
  readonly cancelled = output<void>();

  readonly form = this.fb.nonNullable.group({
    name: ['', [Validators.required, Validators.maxLength(150)]],
    course_id: [0, [Validators.required, Validators.min(1)]],
    description: ['']
  });

  constructor() {
    effect(() => {
      const currentModule = this.module();

      if (currentModule) {
        this.form.reset({
          name: currentModule.name,
          course_id: currentModule.course_id,
          description: currentModule.description ?? ''
        });
      } else {
        this.form.reset({
          name: '',
          course_id: 0,
          description: ''
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

    const payload: ModulePayload = {
      name: values.name.trim(),
      course_id: Number(values.course_id),
      description: values.description.trim() || null,
      ...(this.module() ? {} : { isActive: true })
    };

    this.saved.emit(payload);
  }

  cancel(): void {
    this.cancelled.emit();
  }
}
