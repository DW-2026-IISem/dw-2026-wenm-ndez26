import {
  Component,
  OnInit,
  computed,
  inject,
  signal,
} from '@angular/core';

import { FormsModule } from '@angular/forms';
import { DatePipe } from '@angular/common';
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
  Enrollment,
  EnrollmentPayload,
} from '../../../core/models/enrollment.model';

import { Learner } from '../../../core/models/learner.model';
import { Course } from '../../../core/models/course.model';

import { EnrollmentApi } from '../enrollment-api';
import { LearnerApi } from '../../learners/learner-api';
import { CourseApi } from '../../courses/course-api';
import { EnrollmentForm } from '../enrollment-form/enrollment-form';

@Component({
  selector: 'app-enrollment-list',
  standalone: true,
  imports: [
    FormsModule,
    DatePipe,
    ButtonModule,
    DialogModule,
    InputTextModule,
    TableModule,
    TagModule,
    TooltipModule,
    ConfirmDialogModule,
    ToastModule,
    EnrollmentForm,
  ],
  providers: [ConfirmationService, MessageService],
  templateUrl: './enrollment-list.html',
  styleUrl: './enrollment-list.css',
})
export class EnrollmentList implements OnInit {
  private readonly api = inject(EnrollmentApi);
  private readonly learnersApi = inject(LearnerApi);
  private readonly coursesApi = inject(CourseApi);

  private readonly confirmationService = inject(ConfirmationService);
  private readonly messageService = inject(MessageService);

  readonly rows = signal<Enrollment[]>([]);
  readonly learners = signal<Learner[]>([]);
  readonly courses = signal<Course[]>([]);

  readonly loading = signal(false);
  readonly saving = signal(false);
  readonly error = signal<string | null>(null);

  readonly search = signal('');
  readonly dialogVisible = signal(false);
  readonly selectedEnrollment = signal<Enrollment | null>(null);

  readonly learnerName = computed(() => {
    const map = new Map(
      this.learners().map((learner) => [learner.id, learner.name]),
    );

    return (id: number) => map.get(id) ?? `Aprendiz #${id}`;
  });

  readonly courseName = computed(() => {
    const map = new Map(
      this.courses().map((course) => [course.id, course.name]),
    );

    return (id: number) => map.get(id) ?? `Curso #${id}`;
  });

  readonly activeEnrollmentCount = computed(
    () => this.rows().filter((enrollment) => enrollment.status === 'active').length,
  );

  readonly totalEnrollmentCount = computed(
    () => this.rows().length,
  );

  readonly filteredRows = computed(() => {
    const term = this.search().trim().toLowerCase();

    if (!term) {
      return this.rows();
    }

    return this.rows().filter((enrollment) => {
      const learner = this.learnerName()(enrollment.learner_id);
      const course = this.courseName()(enrollment.course_id);

      return (
        String(enrollment.id).includes(term) ||
        learner.toLowerCase().includes(term) ||
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
      enrollments: this.api.list(),
      learners: this.learnersApi.list(),
      courses: this.coursesApi.list(),
    }).subscribe({
      next: ({ enrollments, learners, courses }) => {
        this.rows.set(enrollments);
        this.learners.set(learners);
        this.courses.set(courses);
        this.loading.set(false);
      },
      error: (error: unknown) => {
        console.error('Error al cargar inscripciones:', error);
        this.error.set('No fue posible cargar las inscripciones, aprendices y cursos.');
        this.loading.set(false);
      },
    });
  }

  openCreate(): void {
    this.selectedEnrollment.set(null);
    this.dialogVisible.set(true);
  }

  openEdit(enrollment: Enrollment): void {
    this.selectedEnrollment.set(enrollment);
    this.dialogVisible.set(true);
  }

  closeDialog(): void {
    this.dialogVisible.set(false);
    this.selectedEnrollment.set(null);
  }

  save(payload: EnrollmentPayload): void {
    this.saving.set(true);

    const current = this.selectedEnrollment();

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
            ? 'Inscripción actualizada correctamente.'
            : 'Inscripción registrada correctamente.',
          life: 3000,
        });

        this.load();
      },
      error: (error: unknown) => {
        console.error('Error al guardar inscripción:', error);
        this.saving.set(false);

        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'No fue posible guardar la inscripción. Verifique los datos seleccionados.',
          life: 4000,
        });
      },
    });
  }

  deactivate(enrollment: Enrollment): void {
    this.confirmationService.confirm({
      header: 'Confirmar desactivación',
      message: `¿Desea desactivar la inscripción número ${enrollment.id}?`,
      icon: 'pi pi-exclamation-triangle',
      acceptLabel: 'Sí, desactivar',
      rejectLabel: 'Cancelar',
      accept: () => {
        this.api.deactivate(enrollment.id).subscribe({
          next: () => {
            this.messageService.add({
              severity: 'success',
              summary: 'Inscripción desactivada',
              detail: 'La inscripción fue desactivada correctamente.',
              life: 3000,
            });

            this.load();
          },
          error: (error: unknown) => {
            console.error('Error al desactivar inscripción:', error);

            this.messageService.add({
              severity: 'error',
              summary: 'Error',
              detail: 'No fue posible desactivar la inscripción.',
              life: 4000,
            });
          },
        });
      },
    });
  }

  remove(enrollment: Enrollment): void {
    this.confirmationService.confirm({
      header: 'Confirmar eliminación',
      message: `¿Está seguro de eliminar definitivamente la inscripción número ${enrollment.id}?`,
      icon: 'pi pi-trash',
      acceptLabel: 'Sí, eliminar',
      rejectLabel: 'Cancelar',
      acceptButtonStyleClass: 'p-button-danger',
      accept: () => {
        this.api.remove(enrollment.id).subscribe({
          next: () => {
            this.messageService.add({
              severity: 'success',
              summary: 'Inscripción eliminada',
              detail: 'La inscripción fue eliminada correctamente.',
              life: 3000,
            });

            this.load();
          },
          error: (error: unknown) => {
            console.error('Error al eliminar inscripción:', error);

            this.messageService.add({
              severity: 'error',
              summary: 'Error',
              detail: 'No fue posible eliminar la inscripción.',
              life: 4000,
            });
          },
        });
      },
    });
  }
}
