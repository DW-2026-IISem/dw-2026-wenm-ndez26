import { Component, computed, inject, signal } from '@angular/core';
import { forkJoin } from 'rxjs';
import { ConfirmationService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { MessageModule } from 'primeng/message';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { TooltipModule } from 'primeng/tooltip';

import { Course, CoursePayload } from '../../../core/models/course.model';
import { Teacher } from '../../../core/models/teacher.model';
import { NotificationService } from '../../../core/services/notification';
import { toApiMessage } from '../../../core/utils/api-error';
import { filterRows } from '../../../core/utils/filter-rows';
import { EmptyState } from '../../../shared/ui/empty-state/empty-state';
import { PageHeader } from '../../../shared/ui/page-header/page-header';
import { StatusTag } from '../../../shared/ui/status-tag/status-tag';
import { CourseApi } from '../course-api';
import { TeacherApi } from '../../teachers/teacher-api';
import { CourseForm } from '../course-form/course-form';

@Component({
  selector: 'app-course-list',
  imports: [
    ButtonModule,
    DialogModule,
    EmptyState,
    InputTextModule,
    MessageModule,
    PageHeader,
    StatusTag,
    TableModule,
    TagModule,
    TooltipModule,
    CourseForm,
  ],
  templateUrl: './course-list.html',
  styleUrl: './course-list.css',
})
export class CourseList {
  private readonly api = inject(CourseApi);
  private readonly teacherApi = inject(TeacherApi);
  private readonly notify = inject(NotificationService);
  private readonly confirmation = inject(ConfirmationService);

  readonly rows = signal<Course[]>([]);
  readonly teachers = signal<Teacher[]>([]);
  readonly loading = signal(true);
  readonly saving = signal(false);
  readonly error = signal<string | null>(null);
  readonly filter = signal('');

  readonly visibleRows = computed(() =>
    filterRows(this.rows(), this.filter(), (course) => [
      course.id,
      course.name,
      course.description,
      course.isActive ? 'activo' : 'inactivo',
    ]),
  );

  readonly activeCourseCount = computed(
    () => this.rows().filter((course) => course.isActive).length,
  );

  readonly teacherName = computed(() => {
    const map = new Map(this.teachers().map((teacher) => [teacher.id, teacher.name]));
    return (id: number) => map.get(id) ?? `Docente #${id}`;
  });

  readonly dialogVisible = signal(false);
  readonly editing = signal<Course | null>(null);
  readonly resetKey = signal(0);

  readonly title = computed(() =>
    this.editing() ? 'Editar curso' : 'Nuevo curso',
  );

  constructor() {
    this.load();
  }

  load(): void {
    this.loading.set(true);
    this.error.set(null);

    forkJoin({
      courses: this.api.list(),
      teachers: this.teacherApi.list(),
    }).subscribe({
      next: ({ courses, teachers }) => {
        this.rows.set(courses);
        this.teachers.set(teachers);
        this.loading.set(false);
      },
      error: (error: unknown) => {
        this.rows.set([]);
        this.error.set(toApiMessage(error));
        this.loading.set(false);
      },
    });
  }

  openCreate(): void {
    this.editing.set(null);
    this.resetKey.update((key) => key + 1);
    this.dialogVisible.set(true);
  }

  openEdit(course: Course): void {
    this.editing.set(course);
    this.resetKey.update((key) => key + 1);
    this.dialogVisible.set(true);
  }

  save(payload: CoursePayload): void {
    const current = this.editing();
    this.saving.set(true);

    const request = current
      ? this.api.update(current.id, payload)
      : this.api.create(payload);

    request.subscribe({
      next: () => {
        this.saving.set(false);
        this.dialogVisible.set(false);
        this.notify.success(
          current ? 'Curso actualizado' : 'Curso creado',
        );
        this.load();
      },
      error: (error: unknown) => {
        this.saving.set(false);
        this.notify.error('No se pudo guardar', toApiMessage(error));
      },
    });
  }

  deactivate(course: Course): void {
    this.confirmation.confirm({
      header: 'Desactivar curso',
      message: `¿Deseas desactivar el curso ${course.name}?`,
      icon: 'pi pi-exclamation-triangle',
      acceptLabel: 'Desactivar',
      rejectLabel: 'Cancelar',
      accept: () => {
        this.api.deactivate(course.id).subscribe({
          next: () => {
            this.notify.warn('Curso desactivado');
            this.load();
          },
          error: (error: unknown) =>
            this.notify.error('No se pudo desactivar', toApiMessage(error)),
        });
      },
    });
  }

  remove(course: Course): void {
    this.confirmation.confirm({
      header: 'Eliminar definitivamente',
      message: `Se eliminará el curso ${course.name}. Esta acción no se puede deshacer.`,
      icon: 'pi pi-trash',
      acceptLabel: 'Eliminar',
      rejectLabel: 'Cancelar',
      accept: () => {
        this.api.remove(course.id).subscribe({
          next: () => {
            this.notify.success('Curso eliminado');
            this.load();
          },
          error: (error: unknown) =>
            this.notify.error('No se pudo eliminar', toApiMessage(error)),
        });
      },
    });
  }
}
