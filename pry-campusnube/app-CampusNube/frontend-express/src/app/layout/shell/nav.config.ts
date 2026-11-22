import { MenuItem } from 'primeng/api';

import { CRUD_RESOURCES } from '../../features/crud/crud-resources';

export interface NavItem extends MenuItem {
  permission?: string;
  anyPermission?: readonly string[];
  authOnly?: boolean;
}

export const NAV: NavItem[] = [
  {
    label: 'Panel',
    icon: 'pi pi-home',
    routerLink: '/dashboard',
  },
  {
    label: 'Docentes',
    icon: 'pi pi-users',
    routerLink: '/docentes',
    permission: 'GET /api/docentes',
  },
  {
    label: 'Aprendices',
    icon: 'pi pi-user',
    routerLink: '/aprendices',
    permission: 'GET /api/aprendices',
  },
  {
    label: 'Cursos',
    icon: 'pi pi-book',
    routerLink: '/cursos',
    permission: 'GET /api/cursos',
  },
  {
    label: 'Módulos',
    icon: 'pi pi-list',
    routerLink: '/modulos',
    permission: 'GET /api/modulos',
  },
  {
    label: 'Lecciones',
    icon: 'pi pi-file',
    routerLink: '/lecciones',
    permission: 'GET /api/lecciones',
  },
  {
    label: 'Evaluaciones',
    icon: 'pi pi-clipboard',
    routerLink: '/evaluaciones',
    permission: 'GET /api/evaluaciones',
  },
  {
    label: 'Inscripciones',
    icon: 'pi pi-user-plus',
    routerLink: '/inscripciones',
    permission: 'GET /api/inscripciones',
  },
  {
    label: 'Intentos',
    icon: 'pi pi-check-square',
    routerLink: '/intentos',
    permission: 'GET /api/intentos',
  },
  {
    label: 'Entregas',
    icon: 'pi pi-upload',
    routerLink: '/entregas',
    permission: 'GET /api/entregas',
  },
  {
    label: 'Progreso',
    icon: 'pi pi-chart-line',
    routerLink: '/progreso',
    permission: 'GET /api/progress',
  },
  {
    label: 'Certificados',
    icon: 'pi pi-id-card',
    routerLink: '/certificados',
    permission: 'GET /api/certificates',
  },
  {
    label: 'Usuarios',
    icon: 'pi pi-users',
    routerLink: '/admin/usuarios',
    permission: 'GET /api/usuarios',
  },
  {
    label: 'Roles',
    icon: 'pi pi-shield',
    routerLink: '/admin/roles',
    permission: 'GET /api/roles',
  },
  {
    label: 'Recursos',
    icon: 'pi pi-database',
    routerLink: '/admin/recursos',
    permission: 'GET /api/recursos',
  },
  {
    label: 'Roles y permisos',
    icon: 'pi pi-lock',
    routerLink: '/admin/roles-permisos',
    anyPermission: CRUD_RESOURCES.map((resource) => resource.permission),
  },
  {
    label: 'Prototipo',
    icon: 'pi pi-desktop',
    routerLink: '/construir',
  },
];
