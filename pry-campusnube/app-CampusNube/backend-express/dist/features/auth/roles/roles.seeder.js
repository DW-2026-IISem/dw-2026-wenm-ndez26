"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SEED_ROLES = void 0;
exports.seedRoles = seedRoles;
const role_model_1 = require("./role.model");
/**
 * Catálogo oficial de roles de CampusNube.
 * Idempotente: crea los roles faltantes y reactiva los existentes.
 */
exports.SEED_ROLES = [
    {
        name: "ADMIN",
        description: "Administración total del sistema y de la plataforma",
    },
    {
        name: "DOCENTE",
        description: "Gestión académica de cursos, módulos, lecciones y evaluaciones",
    },
    {
        name: "APRENDIZ",
        description: "Acceso a contenidos académicos y actividades de formación",
    },
    {
        name: "COORDINADOR",
        description: "Coordinación y supervisión de la gestión académica",
    },
    {
        name: "AUDITOR",
        description: "Consulta y seguimiento de información para auditoría",
    },
];
async function seedRoles() {
    let created = 0;
    for (const item of exports.SEED_ROLES) {
        const [role, wasCreated] = await role_model_1.Role.findOrCreate({
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
            await role.update({
                status: "active",
                description: item.description,
            });
        }
        else if (role.description !== item.description) {
            await role.update({ description: item.description });
        }
    }
    console.log(`✅ roles: catálogo reconciliado (${exports.SEED_ROLES.length} roles, ${created} nuevos)`);
    return created;
}
//# sourceMappingURL=roles.seeder.js.map