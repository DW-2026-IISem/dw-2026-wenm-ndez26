import { TestBed } from '@angular/core/testing';
import { beforeEach, describe, it, expect, vi } from 'vitest';
import { of } from 'rxjs';

import { Dashboard } from './dashboard';

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

describe('Dashboard', () => {
  const teacherApi = { list: vi.fn(() => of([])) };
  const learnerApi = { list: vi.fn(() => of([])) };
  const courseApi = { list: vi.fn(() => of([])) };
  const moduleApi = { list: vi.fn(() => of([])) };
  const lessonApi = { list: vi.fn(() => of([])) };
  const evaluationApi = { list: vi.fn(() => of([])) };
  const enrollmentApi = { list: vi.fn(() => of([])) };
  const attemptApi = { list: vi.fn(() => of([])) };
  const submissionApi = { list: vi.fn(() => of([])) };
  const progressApi = { list: vi.fn(() => of([])) };
  const certificateApi = { list: vi.fn(() => of([])) };

  beforeEach(async () => {
    vi.clearAllMocks();

    await TestBed.configureTestingModule({
      imports: [Dashboard],
      providers: [
        { provide: TeacherApi, useValue: teacherApi },
        { provide: LearnerApi, useValue: learnerApi },
        { provide: CourseApi, useValue: courseApi },
        { provide: ModuleApi, useValue: moduleApi },
        { provide: LessonApi, useValue: lessonApi },
        { provide: EvaluationApi, useValue: evaluationApi },
        { provide: EnrollmentApi, useValue: enrollmentApi },
        { provide: AttemptApi, useValue: attemptApi },
        { provide: SubmissionApi, useValue: submissionApi },
        { provide: ProgressApi, useValue: progressApi },
        { provide: CertificateApi, useValue: certificateApi },
      ],
    }).compileComponents();
  });

  it('debe crear el componente Dashboard', () => {
    const fixture = TestBed.createComponent(Dashboard);

    expect(fixture.componentInstance).toBeTruthy();
  });

  it('debe consultar las once API al cargar', () => {
    TestBed.createComponent(Dashboard);

    expect(teacherApi.list).toHaveBeenCalledTimes(1);
    expect(learnerApi.list).toHaveBeenCalledTimes(1);
    expect(courseApi.list).toHaveBeenCalledTimes(1);
    expect(moduleApi.list).toHaveBeenCalledTimes(1);
    expect(lessonApi.list).toHaveBeenCalledTimes(1);
    expect(evaluationApi.list).toHaveBeenCalledTimes(1);
    expect(enrollmentApi.list).toHaveBeenCalledTimes(1);
    expect(attemptApi.list).toHaveBeenCalledTimes(1);
    expect(submissionApi.list).toHaveBeenCalledTimes(1);
    expect(progressApi.list).toHaveBeenCalledTimes(1);
    expect(certificateApi.list).toHaveBeenCalledTimes(1);
  });

  it('debe finalizar la carga cuando las consultas responden', () => {
    const fixture = TestBed.createComponent(Dashboard);

    expect(fixture.componentInstance.loading()).toBe(false);
    expect(fixture.componentInstance.errorMessage()).toBeNull();
  });

  it('debe calcular el total de docentes', () => {
    const fixture = TestBed.createComponent(Dashboard);
    const dashboard = fixture.componentInstance;

    dashboard.teachers.set([
      {
        id: 1,
        name: 'Docente 1',
        description: null,
        isActive: true,
      },
      {
        id: 2,
        name: 'Docente 2',
        description: null,
        isActive: false,
      },
    ]);

    expect(dashboard.totalTeachers()).toBe(2);
    expect(dashboard.activeTeachers()).toBe(1);
  });

  it('debe calcular el total de aprendices activos', () => {
    const fixture = TestBed.createComponent(Dashboard);
    const dashboard = fixture.componentInstance;

    dashboard.learners.set([
      {
        id: 1,
        name: 'Aprendiz 1',
        description: null,
        status: 'active',
      },
      {
        id: 2,
        name: 'Aprendiz 2',
        description: null,
        status: 'inactive',
      },
    ]);

    expect(dashboard.totalLearners()).toBe(2);
    expect(dashboard.activeLearners()).toBe(1);
  });

  it('debe calcular el total de cursos activos', () => {
    const fixture = TestBed.createComponent(Dashboard);
    const dashboard = fixture.componentInstance;

    dashboard.courses.set([
      {
        id: 1,
        name: 'Curso 1',
        description: null,
        isActive: true,
      },
      {
        id: 2,
        name: 'Curso 2',
        description: null,
        isActive: false,
      },
    ]);

    expect(dashboard.totalCourses()).toBe(2);
    expect(dashboard.activeCourses()).toBe(1);
  });

  it('debe mostrar las listas de actividad reciente', () => {
    const fixture = TestBed.createComponent(Dashboard);
    const dashboard = fixture.componentInstance;

    dashboard.enrollments.set([
      {
        id: 1,
        learner_id: 1,
        course_id: 1,
        enrollment_date: '2026-10-01',
        status: 'active',
      },
    ]);

    dashboard.submissions.set([
      {
        id: 1,
        referencia_id: 1,
        lesson_id: 1,
        enrollment_id: 1,
        fecha_inicio: '2026-10-02',
        fecha_fin: null,
        total: null,
        estado: 'pendiente',
        observaciones: null,
      },
    ]);

    expect(dashboard.latestEnrollments().length).toBe(1);
    expect(dashboard.latestSubmissions().length).toBe(1);
  });
});
