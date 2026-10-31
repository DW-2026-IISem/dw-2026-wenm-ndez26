import { Resource } from "../resources/resource.model";
import { Role } from "../roles/role.model";
import { RESOURCE_CATALOG } from "../resources/resource-catalog";
import { ResourceRolesService } from "./resource-roles.service";

const BUSINESS_PATHS = [
  "/api/aprendices",
  "/api/docentes",
  "/api/cursos",
  "/api/modulos",
  "/api/lecciones",
  "/api/inscripciones",
  "/api/evaluaciones",
  "/api/intentos",
  "/api/entregas",
  "/api/progress",
  "/api/certificates",
] as const;

const DOCENTE_PATHS = [
  "/api/docentes",
  "/api/cursos",
  "/api/modulos",
  "/api/lecciones",
  "/api/evaluaciones",
] as const;

const APRENDIZ_PATHS = [
  "/api/cursos",
  "/api/modulos",
  "/api/lecciones",
  "/api/evaluaciones",
] as const;

const COORDINADOR_MANAGE_PATHS = [
  "/api/aprendices",
  "/api/docentes",
  "/api/cursos",
  "/api/modulos",
  "/api/lecciones",
  "/api/inscripciones",
  "/api/evaluaciones",
] as const;

function belongsTo(path: string, bases: readonly string[]): boolean {
  return bases.some(
    (base) => path === base || path.startsWith(`${base}/`)
  );
}

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
    catalog: typeof RESOURCE_CATALOG[number][]
  ): number[] =>
    catalog
      .map((item) => idByOperation.get(`${item.method} ${item.path}`))
      .filter((id): id is number => typeof id === "number");

  const catalog = [...RESOURCE_CATALOG];

  const policies = [
    {
      roleName: "ADMIN",
      resources: catalog,
    },
    {
      roleName: "DOCENTE",
      resources: catalog.filter((resource) =>
        belongsTo(resource.path, DOCENTE_PATHS)
      ),
    },
    {
      roleName: "APRENDIZ",
      resources: catalog.filter(
        (resource) =>
          resource.method === "GET" &&
          belongsTo(resource.path, APRENDIZ_PATHS)
      ),
    },
    {
      roleName: "COORDINADOR",
      resources: catalog.filter((resource) => {
        if (!belongsTo(resource.path, BUSINESS_PATHS)) {
          return false;
        }

        if (resource.method === "GET") {
          return true;
        }

        return (
          ["POST", "PUT", "PATCH"].includes(resource.method) &&
          belongsTo(resource.path, COORDINADOR_MANAGE_PATHS)
        );
      }),
    },
    {
      roleName: "AUDITOR",
      resources: catalog.filter(
        (resource) =>
          resource.method === "GET" &&
          belongsTo(resource.path, BUSINESS_PATHS)
      ),
    },
  ];

  let total = 0;

  for (const policy of policies) {
    const role = await Role.findOne({
      where: { name: policy.roleName },
    });

    if (!role) {
      console.log(`⚠️ resource_roles: no existe el rol ${policy.roleName}`);
      continue;
    }

    const result = await service.reconcileRole(
      role.id,
      idsFor(policy.resources)
    );

    console.log(
      `✅ resource_roles: ${policy.roleName} -> ${result.total_active} permisos ` +
      `(${result.activated} activados, ${result.deactivated} retirados)`
    );

    total += result.total_active;
  }

  return total;
}
