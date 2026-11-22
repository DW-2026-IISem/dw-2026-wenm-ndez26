export const CRUD_RESOURCES = [
  {
    path: 'asignaciones',
    label: 'Asignaciones de roles',
    permission: 'GET /api/asignaciones-rol',
  },
  {
    path: 'concesiones',
    label: 'Concesiones de permisos',
    permission: 'GET /api/concesiones-rol',
  },
] as const;
