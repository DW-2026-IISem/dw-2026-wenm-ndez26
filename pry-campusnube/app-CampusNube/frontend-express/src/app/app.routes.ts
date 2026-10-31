import { permissionGuard } from './core/guards/permission-guard';
import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'login',
    title: 'Iniciar sesión · CampusNube',
    loadComponent: () =>
      import('./features/auth/login/login').then(
        (m) => m.Login
      ),
  },
  {
    path: 'construir',
    loadComponent: () =>
      import('./construir/construir').then(
        (m) => m.Construir
      ),
  },
  {
    path: '',
    loadComponent: () =>
      import('./layout/shell/shell').then(
        (m) => m.Shell
      ),
    children: [
      {
        path: 'dashboard',
        title: 'Dashboard académico · CampusNube',
        loadComponent: () =>
          import('./features/dashboard/dashboard').then(
            (m) => m.Dashboard
          ),
      },
      {
        path: 'perfil',
        title: 'Mi perfil · CampusNube',
        loadComponent: () =>
          import('./features/auth/profile/profile').then(
            (m) => m.Profile
          ),
      },
      {
        path: 'cursos',
        canActivate: [permissionGuard],
        data: { permission: 'GET /api/cursos' },
        title: 'Cursos · CampusNube',
        loadComponent: () =>
          import('./features/courses/course-list/course-list').then(
            (m) => m.CourseList
          ),
      },
      {
        path: 'docentes',
        canActivate: [permissionGuard],
        data: { permission: 'GET /api/docentes' },
        title: 'Docentes · CampusNube',
        loadComponent: () =>
          import('./features/teachers/teacher-list/teacher-list').then(
            (m) => m.TeacherList
          ),
      },
      {
        path: 'aprendices',
        canActivate: [permissionGuard],
        data: { permission: 'GET /api/aprendices' },
        title: 'Aprendices · CampusNube',
        loadComponent: () =>
          import('./features/learners/learner-list/learner-list').then(
            (m) => m.LearnerList
          ),
      },
      {
        path: 'modulos',
        canActivate: [permissionGuard],
        data: { permission: 'GET /api/modulos' },
        title: 'Módulos · CampusNube',
        loadComponent: () =>
          import('./features/modules/module-list/module-list').then(
            (m) => m.ModuleList
          ),
      },
      {
        path: 'lecciones',
        canActivate: [permissionGuard],
        data: { permission: 'GET /api/lecciones' },
        title: 'Lecciones · CampusNube',
        loadComponent: () =>
          import('./features/lessons/lesson-list/lesson-list').then(
            (m) => m.LessonList
          ),
      },
      {
        path: 'evaluaciones',
        canActivate: [permissionGuard],
        data: { permission: 'GET /api/evaluaciones' },
        title: 'Evaluaciones · CampusNube',
        loadComponent: () =>
          import('./features/evaluations/evaluation-list/evaluation-list').then(
            (m) => m.EvaluationList
          ),
      },
      {
        path: 'intentos',
        canActivate: [permissionGuard],
        data: { permission: 'GET /api/intentos' },
        title: 'Intentos · CampusNube',
        loadComponent: () =>
          import('./features/attempts/attempt-list/attempt-list').then(
            (m) => m.AttemptList
          ),
      },
      {
        path: 'entregas',
        canActivate: [permissionGuard],
        data: { permission: 'GET /api/entregas' },
        title: 'Entregas · CampusNube',
        loadComponent: () =>
          import('./features/submissions/submission-list/submission-list').then(
            (m) => m.SubmissionList
          ),
      },
      {
        path: 'inscripciones',
        canActivate: [permissionGuard],
        data: { permission: 'GET /api/inscripciones' },
        title: 'Inscripciones · CampusNube',
        loadComponent: () =>
          import('./features/enrollments/enrollment-list/enrollment-list').then(
            (m) => m.EnrollmentList
          ),
      },
      {
        path: 'progreso',
        canActivate: [permissionGuard],
        data: { permission: 'GET /api/progress' },
        title: 'Progreso · CampusNube',
        loadComponent: () =>
          import('./features/progress/progress-list/progress-list').then(
            (m) => m.ProgressList
          ),
      },
      {
        path: 'certificados',
        canActivate: [permissionGuard],
        data: { permission: 'GET /api/certificates' },
        title: 'Certificados · CampusNube',
        loadComponent: () =>
          import('./features/certificates/certificate-list/certificate-list').then(
            (m) => m.CertificateList
          ),
      },
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'dashboard',
      },
    ],
  },
  {
    path: '**',
    redirectTo: 'aprendices',
  },
];
