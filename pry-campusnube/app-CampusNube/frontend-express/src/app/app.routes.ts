import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'construir',
    loadComponent: () =>
      import('./construir/construir').then((m) => m.Construir),
  },
  {
    path: '',
    loadComponent: () =>
      import('./layout/shell/shell').then((m) => m.Shell),
    children: [
      {
        path: 'cursos',
        title: 'Cursos · CampusNube',
        loadComponent: () =>
          import('./features/courses/course-list/course-list').then((m) => m.CourseList),
      },

      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'docentes',
      },
      {
        path: 'docentes',
        title: 'Docentes · CampusNube',
        loadComponent: () =>
          import('./features/teachers/teacher-list/teacher-list').then(
            (m) => m.TeacherList,
          ),
      },
      {
        path: 'aprendices',
        title: 'Aprendices · CampusNube',
        loadComponent: () =>
          import('./features/learners/learner-list/learner-list').then(
            (m) => m.LearnerList,
          ),
      },
    ],
  },
  {
    path: '**',
    redirectTo: 'aprendices',
  },
];
