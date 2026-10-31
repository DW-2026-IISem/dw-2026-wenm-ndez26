"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RoleUsersRepository = void 0;
const role_user_model_1 = require("./role-user.model");
const role_model_1 = require("../roles/role.model");
const user_model_1 = require("../users/user.model");
/** `include` reutilizable: resumen del usuario (sin contraseña) y del rol. */
const SUMMARIES = [
    { model: user_model_1.User, as: "user", attributes: ["id", "username", "email"] },
    { model: role_model_1.Role, as: "role", attributes: ["id", "name"] },
];
/**
 * Capa Repository del feature RoleUsers (tabla `role_users`).
 * Única que habla con Sequelize. La proyección del usuario excluye `password`.
 */
class RoleUsersRepository {
    /** Asignaciones activas (con resumen de usuario y rol). */
    async findAllActive() {
        return role_user_model_1.RoleUser.findAll({ where: { status: "active" }, include: SUMMARIES });
    }
    /** Una asignación por PK (o `null`). */
    async findById(id, transaction) {
        return role_user_model_1.RoleUser.findByPk(id, { include: SUMMARIES, transaction });
    }
    /**
     * La asignación de un usuario a un rol, sea cual sea su estado.
     *
     * Permite la semántica *create-or-reactivate*: si ya existe inactiva, se
     * reactiva en lugar de chocar con la restricción única `(user_id, role_id)`.
     */
    async findByUserAndRole(userId, roleId) {
        return role_user_model_1.RoleUser.findOne({ where: { user_id: userId, role_id: roleId } });
    }
    /** Inserta una asignación. */
    async create(data) {
        return role_user_model_1.RoleUser.create(data);
    }
    /** Persiste cambios sobre una instancia existente. */
    async update(roleUser, data) {
        return roleUser.update(data);
    }
}
exports.RoleUsersRepository = RoleUsersRepository;
//# sourceMappingURL=role-users.repository.js.map