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
        path: '',
        pathMatch: 'full',
        redirectTo: 'docentes',
      },
      {
        path: 'docentes',
        title: 'Docentes',
        loadComponent: () =>
          import('./features/teachers/teacher-list/teacher-list')
            .then((m) => m.TeacherList),
      },
    ],
  },
  {
    path: '**',
    redirectTo: 'docentes',
  },
];
