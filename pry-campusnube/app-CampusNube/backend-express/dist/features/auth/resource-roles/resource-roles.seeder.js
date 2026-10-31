"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.seedResourceRoles = seedResourceRoles;
const resource_model_1 = require("../resources/resource.model");
const role_model_1 = require("../roles/role.model");
const resource_catalog_1 = require("../resources/resource-catalog");
const resource_roles_service_1 = require("./resource-roles.service");
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
];
const DOCENTE_PATHS = [
    "/api/docentes",
    "/api/cursos",
    "/api/modulos",
    "/api/lecciones",
    "/api/evaluaciones",
];
const APRENDIZ_PATHS = [
    "/api/cursos",
    "/api/modulos",
    "/api/lecciones",
    "/api/evaluaciones",
];
const COORDINADOR_MANAGE_PATHS = [
    "/api/aprendices",
    "/api/docentes",
    "/api/cursos",
    "/api/modulos",
    "/api/lecciones",
    "/api/inscripciones",
    "/api/evaluaciones",
];
function belongsTo(path, bases) {
    return bases.some((base) => path === base || path.startsWith(`${base}/`));
}
async function seedResourceRoles() {
    const service = new resource_roles_service_1.ResourceRolesService();
    const resources = await resource_model_1.Resource.findAll({
        where: { status: "active" },
    });
    const idByOperation = new Map(resources.map((resource) => [
        `${resource.method} ${resource.path}`,
        resource.id,
    ]));
    const idsFor = (catalog) => catalog
        .map((item) => idByOperation.get(`${item.method} ${item.path}`))
        .filter((id) => typeof id === "number");
    const catalog = [...resource_catalog_1.RESOURCE_CATALOG];
    const policies = [
        {
            roleName: "ADMIN",
            resources: catalog,
        },
        {
            roleName: "DOCENTE",
            resources: catalog.filter((resource) => belongsTo(resource.path, DOCENTE_PATHS)),
        },
        {
            roleName: "APRENDIZ",
            resources: catalog.filter((resource) => resource.method === "GET" &&
                belongsTo(resource.path, APRENDIZ_PATHS)),
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
                return (["POST", "PUT", "PATCH"].includes(resource.method) &&
                    belongsTo(resource.path, COORDINADOR_MANAGE_PATHS));
            }),
        },
        {
            roleName: "AUDITOR",
            resources: catalog.filter((resource) => resource.method === "GET" &&
                belongsTo(resource.path, BUSINESS_PATHS)),
        },
    ];
    let total = 0;
    for (const policy of policies) {
        const role = await role_model_1.Role.findOne({
            where: { name: policy.roleName },
        });
        if (!role) {
            console.log(`⚠️ resource_roles: no existe el rol ${policy.roleName}`);
            continue;
        }
        const result = await service.reconcileRole(role.id, idsFor(policy.resources));
        console.log(`✅ resource_roles: ${policy.roleName} -> ${result.total_active} permisos ` +
            `(${result.activated} activados, ${result.deactivated} retirados)`);
        total += result.total_active;
    }
    return total;
}
//# sourceMappingURL=resource-roles.seeder.js.map