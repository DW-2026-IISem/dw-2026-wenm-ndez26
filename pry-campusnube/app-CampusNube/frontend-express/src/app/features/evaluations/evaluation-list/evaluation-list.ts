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

import {
  Evaluation,
  EvaluationPayload,
} from '../../../core/models/evaluation.model';

import { Course } from '../../../core/models/course.model';

import { EvaluationApi } from '../evaluation-api';
import { CourseApi } from '../../courses/course-api';
import { EvaluationForm } from '../evaluation-form/evaluation-form';

@Component({
  selector: 'app-evaluation-list',
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
    EvaluationForm,
  ],
  providers: [ConfirmationService, MessageService],
  templateUrl: './evaluation-list.html',
  styleUrl: './evaluation-list.css',
})
export class EvaluationList implements OnInit {
  private readonly api = inject(EvaluationApi);
  private readonly coursesApi = inject(CourseApi);
  private readonly confirmationService = inject(ConfirmationService);
  private readonly messageService = inject(MessageService);

  readonly rows = signal<Evaluation[]>([]);
  readonly courses = signal<Course[]>([]);

  readonly loading = signal(false);
  readonly saving = signal(false);
  readonly error = signal<string | null>(null);

  readonly search = signal('');
  readonly dialogVisible = signal(false);
  readonly selectedEvaluation = signal<Evaluation | null>(null);

  readonly courseName = computed(() => {
    const map = new Map(
      this.courses().map((course) => [course.id, course.name]),
    );

    return (id: number) => map.get(id) ?? `Curso #${id}`;
  });

  readonly activeEvaluationCount = computed(
    () => this.rows().filter((evaluation) => evaluation.isActive).length,
  );

  readonly totalEvaluationCount = computed(
    () => this.rows().length,
  );

  readonly filteredRows = computed(() => {
    const term = this.search().trim().toLowerCase();

    if (!term) {
      return this.rows();
    }

    return this.rows().filter((evaluation) => {
      const course = this.courseName()(evaluation.course_id);

      return (
        evaluation.name.toLowerCase().includes(term) ||
        (evaluation.description ?? '').toLowerCase().includes(term) ||
        course.toLowerCase().includes(term)
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
      evaluations: this.api.list(),
      courses: this.coursesApi.list(),
    }).subscribe({
      next: ({ evaluations, courses }) => {
        this.rows.set(evaluations);
        this.courses.set(courses);
        this.loading.set(false);
      },
      error: (error: unknown) => {
        console.error('Error al cargar evaluaciones:', error);
        this.error.set('No fue posible cargar las evaluaciones y cursos.');
        this.loading.set(false);
      },
    });
  }

  openCreate(): void {
    this.selectedEvaluation.set(null);
    this.dialogVisible.set(true);
  }

  openEdit(evaluation: Evaluation): void {
    this.selectedEvaluation.set(evaluation);
    this.dialogVisible.set(true);
  }

  closeDialog(): void {
    this.dialogVisible.set(false);
    this.selectedEvaluation.set(null);
  }

  save(payload: EvaluationPayload): void {
    this.saving.set(true);

    const current = this.selectedEvaluation();

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
            ? 'Evaluación actualizada correctamente.'
            : 'Evaluación registrada correctamente.',
          life: 3000,
        });

        this.load();
      },
      error: (error: unknown) => {
        console.error('Error al guardar evaluación:', error);
        this.saving.set(false);

        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'No fue posible guardar la evaluación. Verifique que el curso esté activo.',
          life: 4000,
        });
      },
    });
  }

  deactivate(evaluation: Evaluation): void {
    this.confirmationService.confirm({
      header: 'Confirmar desactivación',
      message: `¿Desea desactivar la evaluación "${evaluation.name}"?`,
      icon: 'pi pi-exclamation-triangle',
      acceptLabel: 'Sí, desactivar',
      rejectLabel: 'Cancelar',
      accept: () => {
        this.api.deactivate(evaluation.id).subscribe({
          next: () => {
            this.messageService.add({
              severity: 'success',
              summary: 'Evaluación desactivada',
              detail: 'La evaluación fue desactivada correctamente.',
              life: 3000,
            });

            this.load();
          },
          error: (error: unknown) => {
            console.error('Error al desactivar evaluación:', error);
            this.messageService.add({
              severity: 'error',
              summary: 'Error',
              detail: 'No fue posible desactivar la evaluación.',
              life: 4000,
            });
          },
        });
      },
    });
  }

  remove(evaluation: Evaluation): void {
    this.confirmationService.confirm({
      header: 'Confirmar eliminación',
      message: `¿Está seguro de eliminar definitivamente "${evaluation.name}"?`,
      icon: 'pi pi-trash',
      acceptLabel: 'Sí, eliminar',
      rejectLabel: 'Cancelar',
      acceptButtonStyleClass: 'p-button-danger',
      accept: () => {
        this.api.remove(evaluation.id).subscribe({
          next: () => {
            this.messageService.add({
              severity: 'success',
              summary: 'Evaluación eliminada',
              detail: 'La evaluación fue eliminada correctamente.',
              life: 3000,
            });

            this.load();
          },
          error: (error: unknown) => {
            console.error('Error al eliminar evaluación:', error);
            this.messageService.add({
              severity: 'error',
              summary: 'Error',
              detail: 'No fue posible eliminar la evaluación.',
              life: 4000,
            });
          },
        });
      },
    });
  }
}
