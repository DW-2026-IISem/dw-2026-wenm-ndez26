import { Component, effect, inject, input, output } from '@angular/core';
import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { TextareaModule } from 'primeng/textarea';
import { MultiSelectModule } from 'primeng/multiselect';
import { Course, CoursePayload } from '../../../core/models/course.model';
import { Teacher } from '../../../core/models/teacher.model';

@Component({
  selector: 'app-course-form',
  imports: [
    ReactiveFormsModule,
    ButtonModule,
    InputTextModule,
    TextareaModule,
    MultiSelectModule,
  ],
  templateUrl: './course-form.html',
  styleUrl: './course-form.css',
})
export class CourseForm {
  readonly course = input<Course | null>(null);
  readonly teachers = input<Teacher[]>([]);
  readonly saving = input(false);
  readonly resetKey = input(0);

  readonly saved = output<CoursePayload>();
  readonly cancelled = output<void>();

  private readonly fb = inject(NonNullableFormBuilder);

  readonly form = this.fb.group({
    name: ['', [Validators.required, Validators.maxLength(120)]],
    description: [''],
    teacherIds: this.fb.control<number[]>([]),
  });

  constructor() {
    effect(() => {
      const current = this.course();
      this.resetKey();

      this.form.reset({
        name: current?.name ?? '',
        description: current?.description ?? '',
        teacherIds: current?.teachers?.map((teacher) => teacher.id) ?? [],
      });
    });
  }

  submit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const value = this.form.getRawValue();

    this.saved.emit({
      name: value.name.trim(),
      description: value.description.trim() || null,
      teacherIds: value.teacherIds,
    });
  }
}
