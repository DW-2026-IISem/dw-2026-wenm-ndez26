import { authGuard } from './core/guards/auth-guard';
import { permissionGuard } from './core/guards/permission-guard';
import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'login',
    title: 'Iniciar sesión · CampusNube',
    loadComponent: () => import('./features/auth/login/login').then((m) => m.Login),
  },
  {
    path: 'construir',
    loadComponent: () => import('./construir/construir').then((m) => m.Construir),
  },
  {
    path: '',
    canActivate: [authGuard],
    loadComponent: () => import('./layout/shell/shell').then((m) => m.Shell),
    children: [
      {
        path: 'dashboard',
        title: 'Panel académico · CampusNube',
        loadComponent: () => import('./features/dashboard/dashboard').then((m) => m.Dashboard),
      },
      {
        path: 'perfil',
        title: 'Mi perfil · CampusNube',
        loadComponent: () => import('./features/auth/profile/profile').then((m) => m.Profile),
      },
      {
        path: 'cursos',
        canActivate: [permissionGuard],
        data: { permission: 'GET /api/cursos' },
        title: 'Cursos · CampusNube',
        loadComponent: () =>
          import('./features/courses/course-list/course-list').then((m) => m.CourseList),
      },
      {
        path: 'docentes',
        canActivate: [permissionGuard],
        data: { permission: 'GET /api/docentes' },
        title: 'Docentes · CampusNube',
        loadComponent: () =>
          import('./features/teachers/teacher-list/teacher-list').then((m) => m.TeacherList),
      },
      {
        path: 'aprendices',
        canActivate: [permissionGuard],
        data: { permission: 'GET /api/aprendices' },
        title: 'Aprendices · CampusNube',
        loadComponent: () =>
          import('./features/learners/learner-list/learner-list').then((m) => m.LearnerList),
      },
      {
        path: 'modulos',
        canActivate: [permissionGuard],
        data: { permission: 'GET /api/modulos' },
        title: 'Módulos · CampusNube',
        loadComponent: () =>
          import('./features/modules/module-list/module-list').then((m) => m.ModuleList),
      },
      {
        path: 'lecciones',
        canActivate: [permissionGuard],
        data: { permission: 'GET /api/lecciones' },
        title: 'Lecciones · CampusNube',
        loadComponent: () =>
          import('./features/lessons/lesson-list/lesson-list').then((m) => m.LessonList),
      },
      {
        path: 'evaluaciones',
        canActivate: [permissionGuard],
        data: { permission: 'GET /api/evaluaciones' },
        title: 'Evaluaciones · CampusNube',
        loadComponent: () =>
          import('./features/evaluations/evaluation-list/evaluation-list').then(
            (m) => m.EvaluationList,
          ),
      },
      {
        path: 'intentos',
        canActivate: [permissionGuard],
        data: { permission: 'GET /api/intentos' },
        title: 'Intentos · CampusNube',
        loadComponent: () =>
          import('./features/attempts/attempt-list/attempt-list').then((m) => m.AttemptList),
      },
      {
        path: 'entregas',
        canActivate: [permissionGuard],
        data: { permission: 'GET /api/entregas' },
        title: 'Entregas · CampusNube',
        loadComponent: () =>
          import('./features/submissions/submission-list/submission-list').then(
            (m) => m.SubmissionList,
          ),
      },
      {
        path: 'inscripciones',
        canActivate: [permissionGuard],
        data: { permission: 'GET /api/inscripciones' },
        title: 'Inscripciones · CampusNube',
        loadComponent: () =>
          import('./features/enrollments/enrollment-list/enrollment-list').then(
            (m) => m.EnrollmentList,
          ),
      },
      {
        path: 'progreso',
        canActivate: [permissionGuard],
        data: { permission: 'GET /api/progress' },
        title: 'Progreso · CampusNube',
        loadComponent: () =>
          import('./features/progress/progress-list/progress-list').then((m) => m.ProgressList),
      },
      {
        path: 'certificados',
        canActivate: [permissionGuard],
        data: { permission: 'GET /api/certificates' },
        title: 'Certificados · CampusNube',
        loadComponent: () =>
          import('./features/certificates/certificate-list/certificate-list').then(
            (m) => m.CertificateList,
          ),
      },
      {
        path: 'admin/usuarios',
        canActivate: [permissionGuard],
        data: { permission: 'GET /api/usuarios' },
        title: 'Administración de usuarios · CampusNube',
        loadComponent: () =>
          import('./features/admin/users/user-list/user-list').then((m) => m.UserList),
      },
      {
        path: 'admin/roles',
        title: 'Roles · CampusNube',
        canActivate: [permissionGuard],
        data: { permission: 'GET /api/roles' },
        loadComponent: () =>
          import('./features/admin/roles/role-list/role-list').then((m) => m.RoleList),
      },
      {
        path: 'admin/recursos',
        title: 'Recursos · CampusNube',
        canActivate: [permissionGuard],
        data: { permission: 'GET /api/recursos' },
        loadComponent: () =>
          import('./features/admin/resources/resource-list/resource-list').then(
            (m) => m.ResourceList,
          ),
      },
      {
        path: 'admin/roles-permisos',
        title: 'Roles y permisos · CampusNube',
        loadComponent: () =>
          import('./features/crud/roles-permissions-page').then((m) => m.RolesPermissionsPage),
        children: [
          {
            path: 'asignaciones',
            canActivate: [permissionGuard],
            data: { permission: 'GET /api/asignaciones-rol' },
            title: 'Asignaciones usuario-rol · CampusNube',
            loadComponent: () =>
              import('./features/admin/role-users/role-user-list/role-user-list').then(
                (m) => m.RoleUserList,
              ),
          },
          {
            path: 'concesiones',
            title: 'Concesiones · CampusNube',
            canActivate: [permissionGuard],
            data: { permission: 'GET /api/concesiones-rol' },
            loadComponent: () =>
              import('./features/admin/resource-roles/resource-role-list/resource-role-list').then(
                (m) => m.ResourceRoleList,
              ),
          },
        ],
      },
      {
        path: 'admin/permisos',
        pathMatch: 'full',
        redirectTo: 'admin/roles-permisos/concesiones',
      },
      {
        path: 'admin/asignaciones',
        pathMatch: 'full',
        redirectTo: 'admin/roles-permisos/asignaciones',
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
