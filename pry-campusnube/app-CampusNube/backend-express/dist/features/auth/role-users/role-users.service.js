"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RoleUsersService = void 0;
const dto_1 = require("./dto");
const role_users_repository_1 = require("./role-users.repository");
const users_repository_1 = require("../users/users.repository");
const roles_repository_1 = require("../roles/roles.repository");
const app_error_1 = require("../../../shared/errors/app-error");
/**
 * Capa Service del feature RoleUsers — **asignaciones usuario ↔ rol**.
 *
 * Aquí empieza la administración de la autorización. Reglas de negocio:
 *  - Solo se asigna un rol **activo** a un usuario **activo** (un eslabón
 *    inactivo rompería la cadena y el permiso no se concedería de todos modos).
 *  - Asignar es **idempotente**: si la pareja ya existía desactivada, se
 *    reactiva; si ya estaba activa, se informa 409 sin duplicar filas.
 *  - Retirar es un borrado lógico: preserva la auditoría y es reversible.
 *
 * El efecto es inmediato: la próxima petición del usuario vuelve a consultar la
 * cadena RBAC y ya ve (o deja de ver) el permiso. No hay caché que invalidar.
 */
class RoleUsersService {
    constructor(repository = new role_users_repository_1.RoleUsersRepository(), usersRepository = new users_repository_1.UsersRepository(), rolesRepository = new roles_repository_1.RolesRepository()) {
        this.repository = repository;
        this.usersRepository = usersRepository;
        this.rolesRepository = rolesRepository;
    }
    // ================== READ ==================
    async getAll() {
        const assignments = await this.repository.findAllActive();
        return assignments.map((assignment) => (0, dto_1.toRoleUserResponse)(assignment));
    }
    async getOne(id) {
        return (0, dto_1.toRoleUserResponse)(await this.findOrFail(id));
    }
    // ================== CREATE (asignar) ==================
    /** Asigna un rol a un usuario (o reactiva la asignación existente). */
    async assign(body) {
        if (!body.user_id || !body.role_id) {
            throw new app_error_1.AppError(400, "user_id and role_id are required");
        }
        await this.assertUserActive(body.user_id);
        await this.assertRoleActive(body.role_id);
        const existing = await this.repository.findByUserAndRole(body.user_id, body.role_id);
        if (existing) {
            if (existing.status === "active") {
                throw new app_error_1.AppError(409, "Role is already assigned to this user");
            }
            const reactivated = await this.repository.update(existing, { status: "active" });
            return (0, dto_1.toRoleUserResponse)(await this.reload(reactivated.id));
        }
        const created = await this.repository.create({
            user_id: body.user_id,
            role_id: body.role_id,
            status: "active",
        });
        return (0, dto_1.toRoleUserResponse)(await this.reload(created.id));
    }
    // ================== STATE (retirar / reactivar) ==================
    /** Retirar el rol -> `status = inactive`. El usuario pierde los permisos del rol. */
    async deactivate(id) {
        const assignment = await this.findOrFail(id);
        await this.repository.update(assignment, { status: "inactive" });
        return (0, dto_1.toRoleUserResponse)(await this.reload(assignment.id));
    }
    /** Reactivar la asignación. */
    async reactivate(id) {
        const assignment = await this.findOrFail(id, false);
        if (assignment.status === "active") {
            throw new app_error_1.AppError(409, "Assignment is already active");
        }
        await this.repository.update(assignment, { status: "active" });
        return (0, dto_1.toRoleUserResponse)(await this.reload(assignment.id));
    }
    // ================== HELPERS ==================
    async findOrFail(id, onlyActive = true) {
        const assignment = await this.repository.findById(id);
        if (!assignment || (onlyActive && assignment.status !== "active")) {
            throw new app_error_1.AppError(404, "Role assignment not found");
        }
        return assignment;
    }
    /** Recarga con los `include` de resumen (el `findById` ya los trae). */
    async reload(id) {
        const assignment = await this.repository.findById(id);
        if (!assignment) {
            throw new app_error_1.AppError(404, "Role assignment not found");
        }
        return assignment;
    }
    async assertUserActive(userId) {
        const user = await this.usersRepository.findById(userId);
        if (!user || user.status !== "active") {
            throw new app_error_1.AppError(404, "User not found or inactive");
        }
    }
    async assertRoleActive(roleId) {
        const role = await this.rolesRepository.findById(roleId);
        if (!role || role.status !== "active") {
            throw new app_error_1.AppError(404, "Role not found or inactive");
        }
    }
}
exports.RoleUsersService = RoleUsersService;
//# sourceMappingURL=role-users.service.js.map