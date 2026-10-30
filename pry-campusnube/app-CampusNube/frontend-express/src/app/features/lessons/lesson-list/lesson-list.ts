import {
  Component,
  OnInit,
  computed,
  inject,
  signal,
} from '@angular/core';

import { FormsModule } from '@angular/forms';
import { forkJoin } from 'rxjs';

import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { TooltipModule } from 'primeng/tooltip';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ToastModule } from 'primeng/toast';

import {
  ConfirmationService,
  MessageService,
} from 'primeng/api';

import { Lesson, LessonPayload } from '../../../core/models/lesson.model';
import { Module } from '../../../core/models/module.model';

import { LessonApi } from '../lesson-api';
import { ModuleApi } from '../../modules/module-api';
import { LessonForm } from '../lesson-form/lesson-form';

@Component({
  selector: 'app-lesson-list',
  standalone: true,
  imports: [
    FormsModule,
    ButtonModule,
    DialogModule,
    InputTextModule,
    TableModule,
    TagModule,
    TooltipModule,
    ConfirmDialogModule,
    ToastModule,
    LessonForm,
  ],
  providers: [ConfirmationService, MessageService],
  templateUrl: './lesson-list.html',
  styleUrl: './lesson-list.css',
})
export class LessonList implements OnInit {
  private readonly api = inject(LessonApi);
  private readonly modulesApi = inject(ModuleApi);
  private readonly confirmationService = inject(ConfirmationService);
  private readonly messageService = inject(MessageService);

  readonly rows = signal<Lesson[]>([]);
  readonly modules = signal<Module[]>([]);

  readonly loading = signal(false);
  readonly saving = signal(false);
  readonly error = signal<string | null>(null);

  readonly search = signal('');
  readonly dialogVisible = signal(false);
  readonly selectedLesson = signal<Lesson | null>(null);

  readonly activeLessonCount = computed(
    () => this.rows().filter((lesson) => lesson.isActive).length,
  );

  readonly moduleName = computed(() => {
    const map = new Map(
      this.modules().map((module) => [module.id, module.name]),
    );

    return (id: number) => map.get(id) ?? `Módulo #${id}`;
  });

  readonly filteredRows = computed(() => {
    const term = this.search().trim().toLowerCase();

    if (!term) {
      return this.rows();
    }

    return this.rows().filter((lesson) => {
      const module = this.moduleName()(lesson.module_id);

      return (
        lesson.name.toLowerCase().includes(term) ||
        (lesson.description ?? '').toLowerCase().includes(term) ||
        module.toLowerCase().includes(term)
      );
    });
  });

  ngOnInit(): void {
    this.load();
  }

  load(): void {
    this.loading.set(true);
    this.error.set(null);

    forkJoin({
      lessons: this.api.list(),
      modules: this.modulesApi.list(),
    }).subscribe({
      next: ({ lessons, modules }) => {
        this.rows.set(lessons);
        this.modules.set(modules);
        this.loading.set(false);
      },
      error: (error: unknown) => {
        console.error('Error al cargar lecciones:', error);
        this.error.set('No fue posible cargar las lecciones y módulos.');
        this.loading.set(false);
      },
    });
  }

  openCreate(): void {
    this.selectedLesson.set(null);
    this.dialogVisible.set(true);
  }

  openEdit(lesson: Lesson): void {
    this.selectedLesson.set(lesson);
    this.dialogVisible.set(true);
  }

  closeDialog(): void {
    this.dialogVisible.set(false);
    this.selectedLesson.set(null);
  }

  save(payload: LessonPayload): void {
    this.saving.set(true);

    const current = this.selectedLesson();

    const request = current
      ? this.api.update(current.id, payload)
      : this.api.create(payload);

    request.subscribe({
      next: () => {
        this.saving.set(false);
        this.closeDialog();

        this.messageService.add({
          severity: 'success',
          summary: 'Operación exitosa',
          detail: current
            ? 'Lección actualizada correctamente.'
            : 'Lección registrada correctamente.',
          life: 3000,
        });

        this.load();
      },
      error: (error: unknown) => {
        console.error('Error al guardar lección:', error);
        this.saving.set(false);

        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'No fue posible guardar la lección. Verifique que el módulo esté activo.',
          life: 4000,
        });
      },
    });
  }

  deactivate(lesson: Lesson): void {
    this.confirmationService.confirm({
      header: 'Confirmar desactivación',
      message: `¿Desea desactivar la lección "${lesson.name}"?`,
      icon: 'pi pi-exclamation-triangle',
      acceptLabel: 'Sí, desactivar',
      rejectLabel: 'Cancelar',
      accept: () => {
        this.api.deactivate(lesson.id).subscribe({
          next: () => {
            this.messageService.add({
              severity: 'success',
              summary: 'Lección desactivada',
              detail: 'La lección fue desactivada correctamente.',
              life: 3000,
            });
            this.load();
          },
          error: (error: unknown) => {
            console.error('Error al desactivar lección:', error);
            this.messageService.add({
              severity: 'error',
              summary: 'Error',
              detail: 'No fue posible desactivar la lección.',
              life: 4000,
            });
          },
        });
      },
    });
  }

  remove(lesson: Lesson): void {
    this.confirmationService.confirm({
      header: 'Confirmar eliminación',
      message: `¿Está seguro de eliminar definitivamente la lección "${lesson.name}"?`,
      icon: 'pi pi-trash',
      acceptLabel: 'Sí, eliminar',
      rejectLabel: 'Cancelar',
      acceptButtonStyleClass: 'p-button-danger',
      accept: () => {
        this.api.remove(lesson.id).subscribe({
          next: () => {
            this.messageService.add({
              severity: 'success',
              summary: 'Lección eliminada',
              detail: 'La lección fue eliminada correctamente.',
              life: 3000,
            });
            this.load();
          },
          error: (error: unknown) => {
            console.error('Error al eliminar lección:', error);
            this.messageService.add({
              severity: 'error',
              summary: 'Error',
              detail: 'No fue posible eliminar la lección.',
              life: 4000,
            });
          },
        });
      },
    });
  }
}
