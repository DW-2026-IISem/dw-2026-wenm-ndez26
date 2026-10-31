import { Resource } from "../resources/resource.model";
import { Role } from "../roles/role.model";
import { RESOURCE_CATALOG } from "../resources/resource-catalog";
import { ResourceRolesService } from "./resource-roles.service";

/**
 * Seeder de concesiones rol-recurso (`resource_roles`).
 *
 * CampusNube:
 * - ADMIN recibe todos los recursos del catálogo.
 * - DOCENTE recibe los recursos relacionados con la gestión académica.
 *
 * La reconciliación es determinista e idempotente mediante `reconcileRole`.
 */
export async function seedResourceRoles(): Promise<number> {
  const service = new ResourceRolesService();

  const resources = await Resource.findAll({
    where: { status: "active" },
  });

  const idByOperation = new Map(
    resources.map((resource) => [
      `${resource.method} ${resource.path}`,
      resource.id,
    ])
  );

  const idsFor = (
    catalog: ReadonlyArray<{ method: string; path: string }>
  ): number[] =>
    catalog
      .map((item) => idByOperation.get(`${item.method} ${item.path}`))
      .filter((id): id is number => typeof id === "number");

  /*
   * ADMIN:
   * acceso completo al catálogo RBAC de CampusNube.
   */
  const admin = await Role.findOne({
    where: { name: "ADMIN" },
  });

  let total = 0;

  if (admin) {
    const result = await service.reconcileRole(
      admin.id,
      idsFor(RESOURCE_CATALOG)
    );

    console.log(
      `✅ resource_roles: ADMIN -> ${result.total_active} recursos ` +
        `(${result.activated} altas, ${result.deactivated} bajas)`
    );

    total += result.total_active;
  }

  /*
   * DOCENTE:
   * recursos necesarios para la gestión académica.
   */
  const docente = await Role.findOne({
    where: { name: "DOCENTE" },
  });

  if (docente) {
    const docenteCatalog = RESOURCE_CATALOG.filter((resource) =>
      [
        "/api/docentes",
        "/api/cursos",
        "/api/modulos",
        "/api/lecciones",
        "/api/evaluaciones",
      ].some(
        (basePath) =>
          resource.path === basePath ||
          resource.path.startsWith(`${basePath}/`)
      )
    );

    const result = await service.reconcileRole(
      docente.id,
      idsFor(docenteCatalog)
    );

    console.log(
      `✅ resource_roles: DOCENTE -> ${result.total_active} recursos ` +
        `(${result.activated} altas, ${result.deactivated} bajas)`
    );

    total += result.total_active;
  }

  return total;
}