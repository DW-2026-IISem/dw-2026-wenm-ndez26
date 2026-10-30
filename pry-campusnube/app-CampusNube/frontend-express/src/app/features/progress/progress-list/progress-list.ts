import {
  Component,
  computed,
  inject,
  signal,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { forkJoin } from 'rxjs';

import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { TagModule } from 'primeng/tag';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ToastModule } from 'primeng/toast';
import { TooltipModule } from 'primeng/tooltip';

import { ConfirmationService, MessageService } from 'primeng/api';

import { Enrollment } from '../../../core/models/enrollment.model';
import { Progress } from '../../../core/models/progress.model';

import { EnrollmentApi } from '../../enrollments/enrollment-api';
import { ProgressApi } from '../progress-api';
import { ProgressForm } from '../progress-form/progress-form';

@Component({
  selector: 'app-progress-list',
  standalone: true,
  imports: [
    CommonModule,
    ButtonModule,
    TableModule,
    DialogModule,
    InputTextModule,
    TagModule,
    ConfirmDialogModule,
    ToastModule,
    TooltipModule,
    ProgressForm,
  ],
  providers: [ConfirmationService, MessageService],
  templateUrl: './progress-list.html',
  styleUrl: './progress-list.css',
})
export class ProgressList {
  private readonly api = inject(ProgressApi);
  private readonly enrollmentApi = inject(EnrollmentApi);
  private readonly confirmation = inject(ConfirmationService);
  private readonly messages = inject(MessageService);

  readonly progress = signal<Progress[]>([]);
  readonly enrollments = signal<Enrollment[]>([]);
  readonly loading = signal(false);
  readonly search = signal('');
  readonly dialogVisible = signal(false);
  readonly selectedProgress = signal<Progress | null>(null);

  readonly enrollmentMap = computed(() => {
    const map = new Map<number, Enrollment>();

    for (const enrollment of this.enrollments()) {
      map.set(enrollment.id, enrollment);
    }

    return map;
  });

  readonly totalCount = computed(() => this.progress().length);

  readonly activeCount = computed(
    () => this.progress().filter(item => item.isActive).length,
  );

  readonly filteredProgress = computed(() => {
    const term = this.search().toLowerCase().trim();

    if (!term) {
      return this.progress();
    }

    return this.progress().filter(item => {
      const enrollment = this.enrollmentMap().get(item.enrollment_id);

      return [
        item.name,
        item.description ?? '',
        String(item.id),
        String(item.enrollment_id),
        String(enrollment?.learner_id ?? ''),
        String(enrollment?.course_id ?? ''),
      ].some(value => value.toLowerCase().includes(term));
    });
  });

  constructor() {
    this.loadData();
  }

  loadData(): void {
    this.loading.set(true);

    forkJoin({
      progress: this.api.list(),
      enrollments: this.enrollmentApi.list(),
    }).subscribe({
      next: response => {
        this.progress.set(response.progress);
        this.enrollments.set(response.enrollments);
        this.loading.set(false);
      },
      error: () => {
        this.loading.set(false);
        this.messages.add({
          severity: 'error',
          summary: 'Error',
          detail: 'No fue posible cargar el progreso y las inscripciones.',
        });
      },
    });
  }

  enrollmentLabel(enrollmentId: number): string {
    const enrollment = this.enrollmentMap().get(enrollmentId);

    if (!enrollment) {
      return `Inscripción #${enrollmentId}`;
    }

    return `Inscripción #${enrollment.id} — Aprendiz #${enrollment.learner_id} — Curso #${enrollment.course_id}`;
  }

  newProgress(): void {
    this.selectedProgress.set(null);
    this.dialogVisible.set(true);
  }

  editProgress(item: Progress): void {
    this.selectedProgress.set(item);
    this.dialogVisible.set(true);
  }

  closeDialog(): void {
    this.dialogVisible.set(false);
    this.selectedProgress.set(null);
  }

  onSaved(): void {
    this.closeDialog();
    this.loadData();
    this.messages.add({
      severity: 'success',
      summary: 'Correcto',
      detail: 'El progreso se guardó correctamente.',
    });
  }

  deactivate(item: Progress): void {
    this.confirmation.confirm({
      header: 'Desactivar progreso',
      message: `¿Desea desactivar "${item.name}"?`,
      icon: 'pi pi-exclamation-triangle',
      acceptLabel: 'Sí, desactivar',
      rejectLabel: 'Cancelar',
      accept: () => {
        this.api.deactivate(item.id).subscribe({
          next: () => {
            this.messages.add({
              severity: 'success',
              summary: 'Correcto',
              detail: 'Progreso desactivado correctamente.',
            });
            this.loadData();
          },
          error: () => {
            this.messages.add({
              severity: 'error',
              summary: 'Error',
              detail: 'No fue posible desactivar el progreso.',
            });
          },
        });
      },
    });
  }

  remove(item: Progress): void {
    this.confirmation.confirm({
      header: 'Eliminar progreso',
      message: `¿Está seguro de eliminar físicamente "${item.name}"?`,
      icon: 'pi pi-exclamation-triangle',
      acceptLabel: 'Eliminar',
      rejectLabel: 'Cancelar',
      acceptButtonStyleClass: 'p-button-danger',
      accept: () => {
        this.api.remove(item.id).subscribe({
          next: () => {
            this.messages.add({
              severity: 'success',
              summary: 'Correcto',
              detail: 'Progreso eliminado correctamente.',
            });
            this.loadData();
          },
          error: () => {
            this.messages.add({
              severity: 'error',
              summary: 'Error',
              detail: 'No fue posible eliminar el progreso.',
            });
          },
        });
      },
    });
  }
}
