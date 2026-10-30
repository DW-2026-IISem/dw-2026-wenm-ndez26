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
          import('./features/courses/course-list/course-list').then(
            (m) => m.CourseList
          ),
      },
      {
        path: 'docentes',
        title: 'Docentes · CampusNube',
        loadComponent: () =>
          import('./features/teachers/teacher-list/teacher-list').then(
            (m) => m.TeacherList
          ),
      },
      {
        path: 'aprendices',
        title: 'Aprendices · CampusNube',
        loadComponent: () =>
          import('./features/learners/learner-list/learner-list').then(
            (m) => m.LearnerList
          ),
      },
      {
        path: 'modulos',
        title: 'Módulos · CampusNube',
        loadComponent: () =>
          import('./features/modules/module-list/module-list').then(
            (m) => m.ModuleList
          ),
      },
      {
        path: 'lecciones',
        title: 'Lecciones · CampusNube',
        loadComponent: () =>
          import('./features/lessons/lesson-list/lesson-list').then(
            (m) => m.LessonList,
          ),
      },
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'docentes',
      },
    ],
  },
  {
    path: '**',
    redirectTo: 'aprendices',
  },
];
