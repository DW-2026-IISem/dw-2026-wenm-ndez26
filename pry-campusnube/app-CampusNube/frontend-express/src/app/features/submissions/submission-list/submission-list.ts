import { Component, computed, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { forkJoin } from 'rxjs';

import { Submission } from '../../../core/models/submission.model';
import { Lesson } from '../../../core/models/lesson.model';
import { Enrollment } from '../../../core/models/enrollment.model';
import { toNumber } from '../../../core/models/api.model';

import { SubmissionApi } from '../submission-api';
import { LessonApi } from '../../lessons/lesson-api';
import { EnrollmentApi } from '../../enrollments/enrollment-api';
import { SubmissionForm } from '../submission-form/submission-form';

import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { TagModule } from 'primeng/tag';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ToastModule } from 'primeng/toast';
import { TooltipModule } from 'primeng/tooltip';
import { ConfirmationService, MessageService } from 'primeng/api';

@Component({
  selector: 'app-submission-list',
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
    SubmissionForm
  ],
  providers: [ConfirmationService, MessageService],
  templateUrl: './submission-list.html',
  styleUrl: './submission-list.css'
})
export class SubmissionList {
  private readonly submissionApi = inject(SubmissionApi);
  private readonly lessonApi = inject(LessonApi);
  private readonly enrollmentApi = inject(EnrollmentApi);
  private readonly confirmationService = inject(ConfirmationService);
  private readonly messageService = inject(MessageService);

  readonly submissions = signal<Submission[]>([]);
  readonly lessons = signal<Lesson[]>([]);
  readonly enrollments = signal<Enrollment[]>([]);
  readonly loading = signal(false);
  readonly searchTerm = signal('');
  readonly dialogVisible = signal(false);
  readonly selectedSubmission = signal<Submission | null>(null);

  readonly lessonMap = computed(() =>
    new Map(this.lessons().map(lesson => [lesson.id, lesson.name]))
  );

  readonly enrollmentMap = computed(() =>
    new Map(
      this.enrollments().map(enrollment => [
        enrollment.id,
        `Inscripción #${enrollment.id} — Aprendiz #${enrollment.learner_id} — Curso #${enrollment.course_id}`
      ])
    )
  );

  readonly activeCount = computed(() =>
    this.submissions().filter(
      submission => submission.estado?.toLowerCase() !== 'inactivo'
    ).length
  );

  readonly totalCount = computed(() => this.submissions().length);

  readonly filteredSubmissions = computed(() => {
    const term = this.searchTerm().trim().toLowerCase();

    if (!term) {
      return this.submissions();
    }

    return this.submissions().filter(submission => {
      const lessonName =
        this.lessonMap().get(submission.lesson_id) ?? '';
      const enrollmentName =
        this.enrollmentMap().get(submission.enrollment_id) ?? '';

      return [
        submission.id,
        submission.referencia_id,
        submission.lesson_id,
        submission.enrollment_id,
        submission.estado,
        submission.observaciones,
        lessonName,
        enrollmentName
      ]
        .join(' ')
        .toLowerCase()
        .includes(term);
    });
  });

  constructor() {
    this.loadData();
  }

  loadData(): void {
    this.loading.set(true);

    forkJoin({
      submissions: this.submissionApi.list(),
      lessons: this.lessonApi.list(),
      enrollments: this.enrollmentApi.list()
    }).subscribe({
      next: response => {
        this.submissions.set(response.submissions ?? []);

        const lessonResponse = response.lessons as unknown;
        const enrollmentResponse = response.enrollments as unknown;

        this.lessons.set(
          Array.isArray(lessonResponse)
            ? lessonResponse
            : ((lessonResponse as { lessons?: Lesson[] })?.lessons ?? [])
        );

        this.enrollments.set(
          Array.isArray(enrollmentResponse)
            ? enrollmentResponse
            : ((enrollmentResponse as { enrollments?: Enrollment[] })?.enrollments ?? [])
        );

        this.loading.set(false);
      },
      error: error => {
        this.loading.set(false);
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: error?.error?.message ?? 'No fue posible cargar las entregas.'
        });
      }
    });
  }

  lessonName(id: number): string {
    return this.lessonMap().get(id) ?? `Lección #${id}`;
  }

  enrollmentName(id: number): string {
    return (
      this.enrollmentMap().get(id) ??
      `Inscripción #${id}`
    );
  }

  formatTotal(value: number | string | null): string {
    if (value === null || value === undefined || value === '') {
      return 'No registrado';
    }

    const numericValue = toNumber(value);

    return Number.isNaN(numericValue)
      ? String(value)
      : numericValue.toLocaleString('es-CO', {
          minimumFractionDigits: 0,
          maximumFractionDigits: 2
        });
  }

  create(): void {
    this.selectedSubmission.set(null);
    this.dialogVisible.set(true);
  }

  edit(submission: Submission): void {
    this.selectedSubmission.set(submission);
    this.dialogVisible.set(true);
  }

  closeDialog(): void {
    this.dialogVisible.set(false);
    this.selectedSubmission.set(null);
  }

  onSaved(): void {
    this.closeDialog();
    this.loadData();

    this.messageService.add({
      severity: 'success',
      summary: 'Correcto',
      detail: 'La entrega se guardó correctamente.'
    });
  }

  deactivate(submission: Submission): void {
    this.confirmationService.confirm({
      header: 'Desactivar entrega',
      message: `¿Deseas desactivar la entrega #${submission.id}?`,
      icon: 'pi pi-exclamation-triangle',
      acceptLabel: 'Sí, desactivar',
      rejectLabel: 'Cancelar',
      accept: () => {
        this.submissionApi.deactivate(submission.id).subscribe({
          next: () => {
            this.messageService.add({
              severity: 'success',
              summary: 'Correcto',
              detail: 'La entrega fue desactivada.'
            });
            this.loadData();
          },
          error: error => {
            this.messageService.add({
              severity: 'error',
              summary: 'Error',
              detail: error?.error?.message ?? 'No fue posible desactivar la entrega.'
            });
          }
        });
      }
    });
  }

  remove(submission: Submission): void {
    this.confirmationService.confirm({
      header: 'Eliminar entrega',
      message: `¿Deseas eliminar definitivamente la entrega #${submission.id}?`,
      icon: 'pi pi-exclamation-triangle',
      acceptLabel: 'Sí, eliminar',
      rejectLabel: 'Cancelar',
      accept: () => {
        this.submissionApi.remove(submission.id).subscribe({
          next: () => {
            this.messageService.add({
              severity: 'success',
              summary: 'Correcto',
              detail: 'La entrega fue eliminada.'
            });
            this.loadData();
          },
          error: error => {
            this.messageService.add({
              severity: 'error',
              summary: 'Error',
              detail: error?.error?.message ?? 'No fue posible eliminar la entrega.'
            });
          }
        });
      }
    });
  }
}
