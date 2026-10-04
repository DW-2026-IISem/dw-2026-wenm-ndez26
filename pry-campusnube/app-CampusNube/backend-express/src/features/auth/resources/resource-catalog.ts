/**
 * Catálogo de recursos del sistema CampusNube (fuente única).
 *
 * Un recurso es un par `(method, path)`; un permiso es la concesión de un
 * recurso a un rol.
 *
 * Los roles iniciales de CampusNube son:
 * ADMIN, DOCENTE, APRENDIZ, COORDINADOR y AUDITOR.
 *
 * Este catálogo define los puntos de acceso que posteriormente podrán ser
 * concedidos mediante `resource_roles`.
 *
 * Las operaciones de autenticación/sesión no forman parte del catálogo RBAC.
 */
export interface CatalogResource {
  method: string;
  path: string;
  description: string;
}

export const RESOURCE_CATALOG: readonly CatalogResource[] = [
  // ── Aprendices (7) ─────────────────────────────────────────────
  { method: "GET", path: "/api/aprendices", description: "Listar aprendices" },
  { method: "GET", path: "/api/aprendices/:id", description: "Consultar aprendiz" },
  { method: "POST", path: "/api/aprendices", description: "Crear aprendiz" },
  { method: "PUT", path: "/api/aprendices/:id", description: "Reemplazar aprendiz" },
  { method: "PATCH", path: "/api/aprendices/:id", description: "Modificar aprendiz" },
  { method: "DELETE", path: "/api/aprendices/:id", description: "Eliminar aprendiz" },
  {
    method: "PATCH",
    path: "/api/aprendices/:id/deactivate",
    description: "Desactivar aprendiz",
  },

  // ── Docentes (7) ───────────────────────────────────────────────
  { method: "GET", path: "/api/docentes", description: "Listar docentes" },
  { method: "GET", path: "/api/docentes/:id", description: "Consultar docente" },
  { method: "POST", path: "/api/docentes", description: "Crear docente" },
  { method: "PUT", path: "/api/docentes/:id", description: "Reemplazar docente" },
  { method: "PATCH", path: "/api/docentes/:id", description: "Modificar docente" },
  { method: "DELETE", path: "/api/docentes/:id", description: "Eliminar docente" },
  {
    method: "PATCH",
    path: "/api/docentes/:id/deactivate",
    description: "Desactivar docente",
  },

  // ── Cursos (7) ─────────────────────────────────────────────────
  { method: "GET", path: "/api/cursos", description: "Listar cursos" },
  { method: "GET", path: "/api/cursos/:id", description: "Consultar curso" },
  { method: "POST", path: "/api/cursos", description: "Crear curso" },
  { method: "PUT", path: "/api/cursos/:id", description: "Reemplazar curso" },
  { method: "PATCH", path: "/api/cursos/:id", description: "Modificar curso" },
  { method: "DELETE", path: "/api/cursos/:id", description: "Eliminar curso" },
  {
    method: "PATCH",
    path: "/api/cursos/:id/deactivate",
    description: "Desactivar curso",
  },

  // ── Módulos (7) ─────────────────────────────────────────────────
  { method: "GET", path: "/api/modulos", description: "Listar módulos" },
  { method: "GET", path: "/api/modulos/:id", description: "Consultar módulo" },
  { method: "POST", path: "/api/modulos", description: "Crear módulo" },
  { method: "PUT", path: "/api/modulos/:id", description: "Reemplazar módulo" },
  { method: "PATCH", path: "/api/modulos/:id", description: "Modificar módulo" },
  { method: "DELETE", path: "/api/modulos/:id", description: "Eliminar módulo" },
  {
    method: "PATCH",
    path: "/api/modulos/:id/deactivate",
    description: "Desactivar módulo",
  },

  // ── Lecciones (7) ──────────────────────────────────────────────
  { method: "GET", path: "/api/lecciones", description: "Listar lecciones" },
  { method: "GET", path: "/api/lecciones/:id", description: "Consultar lección" },
  { method: "POST", path: "/api/lecciones", description: "Crear lección" },
  { method: "PUT", path: "/api/lecciones/:id", description: "Reemplazar lección" },
  { method: "PATCH", path: "/api/lecciones/:id", description: "Modificar lección" },
  { method: "DELETE", path: "/api/lecciones/:id", description: "Eliminar lección" },
  {
    method: "PATCH",
    path: "/api/lecciones/:id/deactivate",
    description: "Desactivar lección",
  },

  // ── Inscripciones (7) ──────────────────────────────────────────
  { method: "GET", path: "/api/inscripciones", description: "Listar inscripciones" },
  {
    method: "GET",
    path: "/api/inscripciones/:id",
    description: "Consultar inscripción",
  },
  { method: "POST", path: "/api/inscripciones", description: "Crear inscripción" },
  {
    method: "PUT",
    path: "/api/inscripciones/:id",
    description: "Reemplazar inscripción",
  },
  {
    method: "PATCH",
    path: "/api/inscripciones/:id",
    description: "Modificar inscripción",
  },
  {
    method: "DELETE",
    path: "/api/inscripciones/:id",
    description: "Eliminar inscripción",
  },
  {
    method: "PATCH",
    path: "/api/inscripciones/:id/deactivate",
    description: "Desactivar inscripción",
  },

  // ── Evaluaciones (7) ───────────────────────────────────────────
  { method: "GET", path: "/api/evaluaciones", description: "Listar evaluaciones" },
  {
    method: "GET",
    path: "/api/evaluaciones/:id",
    description: "Consultar evaluación",
  },
  { method: "POST", path: "/api/evaluaciones", description: "Crear evaluación" },
  {
    method: "PUT",
    path: "/api/evaluaciones/:id",
    description: "Reemplazar evaluación",
  },
  {
    method: "PATCH",
    path: "/api/evaluaciones/:id",
    description: "Modificar evaluación",
  },
  {
    method: "DELETE",
    path: "/api/evaluaciones/:id",
    description: "Eliminar evaluación",
  },
  {
    method: "PATCH",
    path: "/api/evaluaciones/:id/deactivate",
    description: "Desactivar evaluación",
  },

  // ── Intentos (7) ───────────────────────────────────────────────
  { method: "GET", path: "/api/intentos", description: "Listar intentos" },
  { method: "GET", path: "/api/intentos/:id", description: "Consultar intento" },
  { method: "POST", path: "/api/intentos", description: "Crear intento" },
  { method: "PUT", path: "/api/intentos/:id", description: "Reemplazar intento" },
  { method: "PATCH", path: "/api/intentos/:id", description: "Modificar intento" },
  { method: "DELETE", path: "/api/intentos/:id", description: "Eliminar intento" },
  {
    method: "PATCH",
    path: "/api/intentos/:id/deactivate",
    description: "Desactivar intento",
  },

  // ── Entregas (7) ────────────────────────────────────────────────
  { method: "GET", path: "/api/entregas", description: "Listar entregas" },
  { method: "GET", path: "/api/entregas/:id", description: "Consultar entrega" },
  { method: "POST", path: "/api/entregas", description: "Crear entrega" },
  { method: "PUT", path: "/api/entregas/:id", description: "Reemplazar entrega" },
  { method: "PATCH", path: "/api/entregas/:id", description: "Modificar entrega" },
  { method: "DELETE", path: "/api/entregas/:id", description: "Eliminar entrega" },
  {
    method: "PATCH",
    path: "/api/entregas/:id/deactivate",
    description: "Desactivar entrega",
  },

  // ── Progreso (6) ────────────────────────────────────────────────
  { method: "GET", path: "/api/progress", description: "Listar progreso" },
  { method: "GET", path: "/api/progress/:id", description: "Consultar progreso" },
  { method: "POST", path: "/api/progress", description: "Crear progreso" },
  { method: "PUT", path: "/api/progress/:id", description: "Reemplazar progreso" },
  { method: "PATCH", path: "/api/progress/:id", description: "Modificar progreso" },
  { method: "DELETE", path: "/api/progress/:id", description: "Eliminar progreso" },

  // ── Certificados (6) ───────────────────────────────────────────
  { method: "GET", path: "/api/certificates", description: "Listar certificados" },
  {
    method: "GET",
    path: "/api/certificates/:id",
    description: "Consultar certificado",
  },
  { method: "POST", path: "/api/certificates", description: "Crear certificado" },
  {
    method: "PUT",
    path: "/api/certificates/:id",
    description: "Reemplazar certificado",
  },
  {
    method: "PATCH",
    path: "/api/certificates/:id",
    description: "Modificar certificado",
  },
  {
    method: "DELETE",
    path: "/api/certificates/:id",
    description: "Eliminar certificado",
  },

  // ── Usuarios (9) ───────────────────────────────────────────────
  { method: "GET", path: "/api/usuarios", description: "Listar usuarios" },
  { method: "GET", path: "/api/usuarios/:id", description: "Consultar usuario" },
  { method: "POST", path: "/api/usuarios", description: "Crear usuario" },
  { method: "PUT", path: "/api/usuarios/:id", description: "Reemplazar usuario" },
  { method: "PATCH", path: "/api/usuarios/:id", description: "Modificar usuario" },
  { method: "DELETE", path: "/api/usuarios/:id", description: "Eliminar usuario" },
  {
    method: "PATCH",
    path: "/api/usuarios/:id/deactivate",
    description: "Desactivar usuario",
  },
  {
    method: "PATCH",
    path: "/api/usuarios/:id/password",
    description: "Cambiar contraseña de usuario",
  },
  {
    method: "GET",
    path: "/api/usuarios/:id/permisos",
    description: "Consultar permisos efectivos del usuario",
  },

  // ── Roles (7) ──────────────────────────────────────────────────
  { method: "GET", path: "/api/roles", description: "Listar roles" },
  { method: "GET", path: "/api/roles/:id", description: "Consultar rol" },
  { method: "POST", path: "/api/roles", description: "Crear rol" },
  { method: "PUT", path: "/api/roles/:id", description: "Reemplazar rol" },
  { method: "PATCH", path: "/api/roles/:id", description: "Modificar rol" },
  { method: "DELETE", path: "/api/roles/:id", description: "Eliminar rol" },
  {
    method: "PATCH",
    path: "/api/roles/:id/deactivate",
    description: "Desactivar rol",
  },

  // ── Recursos (7) ───────────────────────────────────────────────
  { method: "GET", path: "/api/recursos", description: "Listar recursos" },
  { method: "GET", path: "/api/recursos/:id", description: "Consultar recurso" },
  { method: "POST", path: "/api/recursos", description: "Crear recurso" },
  { method: "PUT", path: "/api/recursos/:id", description: "Reemplazar recurso" },
  { method: "PATCH", path: "/api/recursos/:id", description: "Modificar recurso" },
  { method: "DELETE", path: "/api/recursos/:id", description: "Eliminar recurso" },
  {
    method: "PATCH",
    path: "/api/recursos/:id/deactivate",
    description: "Desactivar recurso",
  },

  // ── Asignaciones usuario ↔ rol (5) ─────────────────────────────
  {
    method: "GET",
    path: "/api/asignaciones-rol",
    description: "Listar asignaciones usuario-rol",
  },
  {
    method: "GET",
    path: "/api/asignaciones-rol/:id",
    description: "Consultar asignación usuario-rol",
  },
  {
    method: "POST",
    path: "/api/asignaciones-rol",
    description: "Asignar rol a usuario",
  },
  {
    method: "PATCH",
    path: "/api/asignaciones-rol/:id/deactivate",
    description: "Retirar rol a usuario",
  },
  {
    method: "PATCH",
    path: "/api/asignaciones-rol/:id/reactivate",
    description: "Reactivar rol a usuario",
  },

  // ── Concesiones rol ↔ recurso (5) ──────────────────────────────
  {
    method: "GET",
    path: "/api/concesiones-rol",
    description: "Listar concesiones rol-recurso",
  },
  {
    method: "GET",
    path: "/api/concesiones-rol/:id",
    description: "Consultar concesión rol-recurso",
  },
  {
    method: "POST",
    path: "/api/concesiones-rol",
    description: "Conceder recurso a rol",
  },
  {
    method: "PATCH",
    path: "/api/concesiones-rol/:id/deactivate",
    description: "Retirar recurso a rol",
  },
  {
    method: "PATCH",
    path: "/api/concesiones-rol/:id/reactivate",
    description: "Reactivar recurso a rol",
  },
];
