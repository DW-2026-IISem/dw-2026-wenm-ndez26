import {
  Component,
  computed,
  inject,
  signal,
} from '@angular/core';
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

import { Attempt } from '../../../core/models/attempt.model';
import { Enrollment } from '../../../core/models/enrollment.model';

import { AttemptApi } from '../attempt-api';
import { EnrollmentApi } from '../../enrollments/enrollment-api';
import { AttemptForm } from '../attempt-form/attempt-form';

@Component({
  selector: 'app-attempt-list',
  standalone: true,
  imports: [
    ButtonModule,
    TableModule,
    DialogModule,
    InputTextModule,
    TagModule,
    ConfirmDialogModule,
    ToastModule,
    TooltipModule,
    AttemptForm,
  ],
  providers: [ConfirmationService, MessageService],
  templateUrl: './attempt-list.html',
  styleUrl: './attempt-list.css',
})
export class AttemptList {
  private readonly api = inject(AttemptApi);
  private readonly enrollmentApi = inject(EnrollmentApi);
  private readonly confirmation = inject(ConfirmationService);
  private readonly messages = inject(MessageService);

  attempts = signal<Attempt[]>([]);
  enrollments = signal<Enrollment[]>([]);
  loading = signal(false);
  search = signal('');
  dialogVisible = signal(false);
  selectedAttempt = signal<Attempt | null>(null);

  enrollmentMap = computed(() => {
    const map = new Map<number, Enrollment>();

    for (const enrollment of this.enrollments()) {
      map.set(enrollment.id, enrollment);
    }

    return map;
  });

  filteredAttempts = computed(() => {
    const term = this.search().toLowerCase().trim();

    if (!term) {
      return this.attempts();
    }

    return this.attempts().filter((attempt) => {
      const enrollment = this.enrollmentMap().get(attempt.enrollment_id);

      return (
        attempt.name.toLowerCase().includes(term) ||
        (attempt.description ?? '').toLowerCase().includes(term) ||
        String(attempt.id).includes(term) ||
        String(attempt.enrollment_id).includes(term) ||
        String(enrollment?.learner_id ?? '').includes(term) ||
        String(enrollment?.course_id ?? '').includes(term)
      );
    });
  });

  activeCount = computed(
    () => this.attempts().filter((attempt) => attempt.isActive).length,
  );

  constructor() {
    this.loadData();
  }

  loadData(): void {
    this.loading.set(true);

    forkJoin({
      attempts: this.api.list(),
      enrollments: this.enrollmentApi.list(),
    }).subscribe({
      next: (response) => {
        this.attempts.set(response.attempts);
        this.enrollments.set(response.enrollments);
        this.loading.set(false);
      },
      error: () => {
        this.loading.set(false);
        this.messages.add({
          severity: 'error',
          summary: 'Error',
          detail: 'No fue posible cargar los intentos y las inscripciones.',
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

  newAttempt(): void {
    this.selectedAttempt.set(null);
    this.dialogVisible.set(true);
  }

  editAttempt(attempt: Attempt): void {
    this.selectedAttempt.set(attempt);
    this.dialogVisible.set(true);
  }

  closeDialog(): void {
    this.dialogVisible.set(false);
    this.selectedAttempt.set(null);
  }

  onSaved(): void {
    this.closeDialog();
    this.loadData();
  }

  deactivate(attempt: Attempt): void {
    this.confirmation.confirm({
      header: 'Desactivar intento',
      message: `¿Desea desactivar el intento "${attempt.name}"?`,
      icon: 'pi pi-exclamation-triangle',
      acceptLabel: 'Sí, desactivar',
      rejectLabel: 'Cancelar',
      accept: () => {
        this.api.deactivate(attempt.id).subscribe({
          next: () => {
            this.messages.add({
              severity: 'success',
              summary: 'Correcto',
              detail: 'Intento desactivado correctamente.',
            });
            this.loadData();
          },
          error: () => {
            this.messages.add({
              severity: 'error',
              summary: 'Error',
              detail: 'No fue posible desactivar el intento.',
            });
          },
        });
      },
    });
  }

  remove(attempt: Attempt): void {
    this.confirmation.confirm({
      header: 'Eliminar intento',
      message: `¿Está seguro de eliminar físicamente "${attempt.name}"?`,
      icon: 'pi pi-exclamation-triangle',
      acceptLabel: 'Eliminar',
      rejectLabel: 'Cancelar',
      acceptButtonStyleClass: 'p-button-danger',
      accept: () => {
        this.api.remove(attempt.id).subscribe({
          next: () => {
            this.messages.add({
              severity: 'success',
              summary: 'Correcto',
              detail: 'Intento eliminado correctamente.',
            });
            this.loadData();
          },
          error: () => {
            this.messages.add({
              severity: 'error',
              summary: 'Error',
              detail: 'No fue posible eliminar el intento.',
            });
          },
        });
      },
    });
  }
}
