import {
  Component,
  computed,
  inject,
  signal,
} from '@angular/core';

import { CommonModule } from '@angular/common';
import { forkJoin } from 'rxjs';

// Modelos
import { Teacher } from '../../core/models/teacher.model';
import { Learner } from '../../core/models/learner.model';
import { Course } from '../../core/models/course.model';
import { Module } from '../../core/models/module.model';
import { Lesson } from '../../core/models/lesson.model';
import { Evaluation } from '../../core/models/evaluation.model';
import { Enrollment } from '../../core/models/enrollment.model';
import { Attempt } from '../../core/models/attempt.model';
import { Submission } from '../../core/models/submission.model';
import { Progress } from '../../core/models/progress.model';
import { Certificate } from '../../core/models/certificate.model';

// Servicios API
import { TeacherApi } from '../teachers/teacher-api';
import { LearnerApi } from '../learners/learner-api';
import { CourseApi } from '../courses/course-api';
import { ModuleApi } from '../modules/module-api';
import { LessonApi } from '../lessons/lesson-api';
import { EvaluationApi } from '../evaluations/evaluation-api';
import { EnrollmentApi } from '../enrollments/enrollment-api';
import { AttemptApi } from '../attempts/attempt-api';
import { SubmissionApi } from '../submissions/submission-api';
import { ProgressApi } from '../progress/progress-api';
import { CertificateApi } from '../certificates/certificate-api';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard {

  // Servicios
  private readonly teacherApi = inject(TeacherApi);
  private readonly learnerApi = inject(LearnerApi);
  private readonly courseApi = inject(CourseApi);
  private readonly moduleApi = inject(ModuleApi);
  private readonly lessonApi = inject(LessonApi);
  private readonly evaluationApi = inject(EvaluationApi);
  private readonly enrollmentApi = inject(EnrollmentApi);
  private readonly attemptApi = inject(AttemptApi);
  private readonly submissionApi = inject(SubmissionApi);
  private readonly progressApi = inject(ProgressApi);
  private readonly certificateApi = inject(CertificateApi);

  // Información de las entidades
  readonly teachers = signal<Teacher[]>([]);
  readonly learners = signal<Learner[]>([]);
  readonly courses = signal<Course[]>([]);
  readonly modules = signal<Module[]>([]);
  readonly lessons = signal<Lesson[]>([]);
  readonly evaluations = signal<Evaluation[]>([]);
  readonly enrollments = signal<Enrollment[]>([]);
  readonly attempts = signal<Attempt[]>([]);
  readonly submissions = signal<Submission[]>([]);
  readonly progresses = signal<Progress[]>([]);
  readonly certificates = signal<Certificate[]>([]);

  // Estados de carga y errores
  readonly loading = signal(false);
  readonly errorMessage = signal<string | null>(null);

  // Indicadores calculados
  readonly totalTeachers = computed(() => this.teachers().length);
  readonly activeTeachers = computed(
    () => this.teachers().filter(item => item.isActive).length
  );

  readonly totalLearners = computed(() => this.learners().length);
  readonly activeLearners = computed(
    () => this.learners().filter(item => item.status === 'active').length
  );

  readonly totalCourses = computed(() => this.courses().length);
  readonly activeCourses = computed(
    () => this.courses().filter(item => item.isActive).length
  );

  readonly totalModules = computed(() => this.modules().length);
  readonly activeModules = computed(
    () => this.modules().filter(item => item.isActive).length
  );

  readonly totalLessons = computed(() => this.lessons().length);
  readonly activeLessons = computed(
    () => this.lessons().filter(item => item.isActive).length
  );

  readonly totalEvaluations = computed(() => this.evaluations().length);
  readonly activeEvaluations = computed(
    () => this.evaluations().filter(item => item.isActive).length
  );

  readonly totalEnrollments = computed(() => this.enrollments().length);
  readonly activeEnrollments = computed(
    () => this.enrollments().filter(item => item.status === 'active').length
  );

  readonly totalAttempts = computed(() => this.attempts().length);
  readonly activeAttempts = computed(
    () => this.attempts().filter(item => item.isActive).length
  );

  readonly totalSubmissions = computed(() => this.submissions().length);

  readonly totalProgress = computed(() => this.progresses().length);
  readonly activeProgress = computed(
    () => this.progresses().filter(item => item.isActive).length
  );

  readonly totalCertificates = computed(() => this.certificates().length);
  readonly activeCertificates = computed(
    () => this.certificates().filter(item => item.isActive).length
  );

  // Actividad reciente
  readonly latestEnrollments = computed(() =>
    [...this.enrollments()]
      .sort(
        (a, b) =>
          new Date(b.enrollment_date).getTime() -
          new Date(a.enrollment_date).getTime()
      )
      .slice(0, 5)
  );

  readonly latestSubmissions = computed(() =>
    [...this.submissions()]
      .sort(
        (a, b) =>
          new Date(b.createdAt ?? b.fecha_inicio).getTime() -
          new Date(a.createdAt ?? a.fecha_inicio).getTime()
      )
      .slice(0, 5)
  );

  constructor() {
    this.loadDashboard();
  }

  /**
   * Consulta las once API en paralelo.
   */
  loadDashboard(): void {
    this.loading.set(true);
    this.errorMessage.set(null);

    forkJoin({
      teachers: this.teacherApi.list(),
      learners: this.learnerApi.list(),
      courses: this.courseApi.list(),
      modules: this.moduleApi.list(),
      lessons: this.lessonApi.list(),
      evaluations: this.evaluationApi.list(),
      enrollments: this.enrollmentApi.list(),
      attempts: this.attemptApi.list(),
      submissions: this.submissionApi.list(),
      progresses: this.progressApi.list(),
      certificates: this.certificateApi.list(),
    }).subscribe({
      next: (data) => {
        this.teachers.set(data.teachers);
        this.learners.set(data.learners);
        this.courses.set(data.courses);
        this.modules.set(data.modules);
        this.lessons.set(data.lessons);
        this.evaluations.set(data.evaluations);
        this.enrollments.set(data.enrollments);
        this.attempts.set(data.attempts);
        this.submissions.set(data.submissions);
        this.progresses.set(data.progresses);
        this.certificates.set(data.certificates);

        this.loading.set(false);
      },
      error: (error: unknown) => {
        console.error('Error al cargar el Dashboard:', error);

        this.errorMessage.set(
          'No fue posible cargar la información académica. Verifique la conexión y los permisos.'
        );

        this.loading.set(false);
      },
    });
  }
}
