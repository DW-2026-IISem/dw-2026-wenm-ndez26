"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResourceRolesRepository = void 0;
const sequelize_1 = require("sequelize");
const resource_role_model_1 = require("./resource-role.model");
const role_model_1 = require("../roles/role.model");
const resource_model_1 = require("../resources/resource.model");
const role_user_model_1 = require("../role-users/role-user.model");
/** `include` reutilizable: resumen del rol y del recurso (con `method`/`path`). */
const SUMMARIES = [
    { model: role_model_1.Role, as: "role", attributes: ["id", "name"] },
    {
        model: resource_model_1.Resource,
        as: "resource",
        attributes: ["id", "method", "path", "description"],
    },
];
/**
 * Capa Repository del feature ResourceRoles (tabla `resource_roles`).
 *
 * Aquí vive la **consulta de autorización efectiva**: la única que recorre la
 * cadena completa de seguridad. Es el corazón del RBAC.
 */
class ResourceRolesRepository {
    /** Todas las concesiones activas (con resumen de rol y recurso). */
    async findAllActive() {
        return resource_role_model_1.ResourceRole.findAll({ where: { status: "active" }, include: SUMMARIES });
    }
    /** Concesiones activas filtradas por rol y/o recurso. */
    async findAllActiveFiltered(filters) {
        const where = { status: "active" };
        if (filters.role_id)
            where.role_id = filters.role_id;
        if (filters.resource_id)
            where.resource_id = filters.resource_id;
        return resource_role_model_1.ResourceRole.findAll({
            where,
            include: SUMMARIES,
            order: [["id", "ASC"]],
        });
    }
    /** Una concesión por PK (o `null`). */
    async findById(id, transaction) {
        return resource_role_model_1.ResourceRole.findByPk(id, {
            include: SUMMARIES,
            transaction,
        });
    }
    /** La concesión de un recurso a un rol, sea cual sea su estado. */
    async findByRoleAndResource(roleId, resourceId) {
        return resource_role_model_1.ResourceRole.findOne({
            where: { role_id: roleId, resource_id: resourceId },
        });
    }
    /** Todas las concesiones (activas e inactivas) de un rol. */
    async findAllByRole(roleId, transaction) {
        return resource_role_model_1.ResourceRole.findAll({
            where: { role_id: roleId },
            transaction,
        });
    }
    /** Inserta una concesión. */
    async create(data, transaction) {
        return resource_role_model_1.ResourceRole.create(data, { transaction });
    }
    /** Persiste cambios sobre una instancia existente. */
    async update(resourceRole, data, transaction) {
        return resourceRole.update(data, { transaction });
    }
    /**
     * **CONSULTA DE AUTORIZACIÓN EFECTIVA**.
     *
     * Devuelve los recursos que un usuario puede ejecutar, recorriendo la cadena
     * y exigiendo `status = 'active'` en **los cuatro eslabones**:
     *
     * resource_roles (rr) -> rr.status = active
     *   JOIN roles (ro) -> ro.status = active
     *   JOIN role_users (ru) -> ru.status = active AND ru.user_id = :userId
     *   JOIN resources (r) -> r.status = active
     *
     * Si cualquier eslabón está inactivo o ausente, la fila no aparece: el
     * resultado vacío se traduce en **deny by default** en el middleware.
     *
     * Los `include` con `required: true` producen INNER JOIN; no se usan
     * `attributes` del RoleUser porque solo interesa que exista y cumpla el WHERE.
     */
    async findEffectiveForUser(userId) {
        const rows = await resource_role_model_1.ResourceRole.findAll({
            where: { status: "active" },
            attributes: ["id"],
            include: [
                {
                    model: role_model_1.Role,
                    as: "role",
                    required: true,
                    attributes: ["id", "name"],
                    where: { status: "active" },
                    include: [
                        {
                            model: role_user_model_1.RoleUser,
                            as: "role_users",
                            required: true,
                            attributes: [],
                            where: { status: "active", user_id: userId },
                        },
                    ],
                },
                {
                    model: resource_model_1.Resource,
                    as: "resource",
                    required: true,
                    attributes: ["id", "method", "path", "description"],
                    where: { status: "active" },
                },
            ],
            order: [["id", "ASC"]],
        });
        return rows.map((row) => {
            const plain = row.toJSON();
            return {
                resource_id: plain.resource.id,
                method: plain.resource.method,
                path: plain.resource.path,
                description: plain.resource.description,
                role_id: plain.role.id,
                role_name: plain.role.name,
            };
        });
    }
    /** Cuenta las concesiones activas de un rol. */
    async countActiveByRole(roleId) {
        return resource_role_model_1.ResourceRole.count({
            where: { role_id: roleId, status: "active" },
        });
    }
    /** Cuenta las concesiones activas totales. */
    async countActive() {
        return resource_role_model_1.ResourceRole.count({ where: { status: "active" } });
    }
    /** Cuenta las concesiones activas cuyo recurso está en una lista de ids. */
    async countActiveByResources(resourceIds) {
        if (resourceIds.length === 0)
            return 0;
        return resource_role_model_1.ResourceRole.count({
            where: {
                resource_id: { [sequelize_1.Op.in]: resourceIds },
                status: "active",
            },
        });
    }
}
exports.ResourceRolesRepository = ResourceRolesRepository;
//# sourceMappingURL=resource-roles.repository.js.map