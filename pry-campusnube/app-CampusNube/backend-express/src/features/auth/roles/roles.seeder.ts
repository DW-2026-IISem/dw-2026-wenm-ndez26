import { Role } from "./role.model";

/**
 * Seeder del catálogo de roles (`roles`).
 *
 * Crea los roles de referencia de CampusNube. Es determinista (no usa datos
 * aleatorios) e idempotente: `findOrCreate` por nombre y reactivación si ya
 * existía inactivo.
 *
 * Los roles nacen **sin permisos**: las concesiones se crean posteriormente
 * mediante el feature de resource-roles.
 */
export const SEED_ROLES = [
  {
    name: "ADMIN",
    description: "Administración del sistema y gestión de la plataforma",
  },
  {
    name: "DOCENTE",
    description: "Gestión académica de cursos, módulos, lecciones y evaluaciones",
  },
] as const;

export async function seedRoles(): Promise<number> {
  let created = 0;

  for (const item of SEED_ROLES) {
    const [role, wasCreated] = await Role.findOrCreate({
      where: { name: item.name },
      defaults: {
        name: item.name,
        description: item.description,
        status: "active",
      },
    });

    if (wasCreated) {
      created++;
      continue;
    }

    if (role.status !== "active") {
      await role.update({ status: "active" });
    }
  }

  console.log(
    `✅ roles: catálogo reconciliado (${SEED_ROLES.length} roles, ${created} nuevos)`
  );

  return created;
}
