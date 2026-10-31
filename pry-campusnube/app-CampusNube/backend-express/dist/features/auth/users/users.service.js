"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersService = void 0;
const dto_1 = require("./dto");
const users_repository_1 = require("./users.repository");
const app_error_1 = require("../../../shared/errors/app-error");
const password_1 = require("../../../shared/auth/password");
const resource_roles_service_1 = require("../resource-roles/resource-roles.service");
/**
 * Capa Service del feature Users.
 *
 * Reglas de negocio: unicidad de `username`/`email`, default de `status`,
 * política de borrado lógico, cambio de credencial y consulta de permisos
 * efectivos (que delega en el feature `resource-roles`: el permiso es una
 * concesión rol-recurso, no un atributo del usuario).
 *
 * No conoce `req`/`res` ni escribe Sequelize directamente.
 */
class UsersService {
    constructor(repository = new users_repository_1.UsersRepository(), resourceRolesService = new resource_roles_service_1.ResourceRolesService()) {
        this.repository = repository;
        this.resourceRolesService = resourceRolesService;
    }
    // ================== READ ==================
    async getAll() {
        const users = await this.repository.findAllActive();
        return users.map((user) => (0, dto_1.toUserResponse)(user));
    }
    async getOne(id) {
        return (0, dto_1.toUserResponse)(await this.findOrFail(id));
    }
    /** Permisos efectivos del usuario (cadena RBAC completa). 404 si no existe. */
    async getEffectivePermissions(id) {
        await this.findOrFail(id);
        return this.resourceRolesService.findEffectiveForUser(id);
    }
    // ================== CREATE ==================
    async create(body) {
        await this.assertUnique(body.username, body.email);
        // Copia campo a campo: solo lo que declara el DTO llega al modelo
        // (evita *mass assignment*, p. ej. inyectar un `id` o un `status` raro).
        const user = await this.repository.create({
            username: body.username,
            email: body.email,
            password: body.password,
            avatar: body.avatar ?? null,
            status: body.status ?? "active",
        });
        return (0, dto_1.toUserResponse)(user);
    }
    // ================== UPDATE ==================
    async updatePut(id, body) {
        const user = await this.findOrFail(id);
        await this.assertUnique(body.username, body.email, id);
        await this.repository.update(user, {
            username: body.username,
            email: body.email,
            avatar: body.avatar ?? null,
        });
        return (0, dto_1.toUserResponse)(user);
    }
    async updatePatch(id, body) {
        const user = await this.findOrFail(id);
        const username = body.username ?? user.username;
        const email = body.email ?? user.email;
        await this.assertUnique(username, email, id);
        await this.repository.update(user, body);
        return (0, dto_1.toUserResponse)(user);
    }
    /**
     * Cambia la contraseña de un usuario.
     *
     * Verifica la credencial actual antes de aceptar la nueva. El hash lo vuelve a
     * calcular el hook `beforeUpdate` del modelo al detectar el campo cambiado.
     */
    async changePassword(id, body) {
        if (!body.current_password || !body.new_password) {
            throw new app_error_1.AppError(400, "current_password and new_password are required");
        }
        const user = await this.repository.findByIdWithPassword(id);
        if (!user || user.status !== "active") {
            throw new app_error_1.AppError(404, "User not found");
        }
        const matches = await (0, password_1.comparePassword)(body.current_password, user.password);
        if (!matches) {
            throw new app_error_1.AppError(400, "Current password is incorrect");
        }
        await this.repository.update(user, { password: body.new_password });
    }
    // ================== DELETE ==================
    /** Eliminación física. */
    async deletePhysical(id) {
        const user = await this.findOrFail(id, false);
        await this.repository.delete(user);
    }
    /** Eliminación lógica -> `status = inactive`. */
    async deleteLogical(id) {
        const user = await this.findOrFail(id);
        await this.repository.update(user, { status: "inactive" });
        return (0, dto_1.toUserResponse)(user);
    }
    // ================== HELPERS ==================
    /** Busca por PK y falla con 404. `onlyActive` aplica la política de borrado lógico. */
    async findOrFail(id, onlyActive = true) {
        const user = await this.repository.findById(id);
        if (!user || (onlyActive && user.status !== "active")) {
            throw new app_error_1.AppError(404, "User not found");
        }
        return user;
    }
    /**
     * Comprueba que `username` y `email` no estén tomados por **otro** usuario.
     *
     * `excludeId` permite excluir al propio usuario en las actualizaciones. Se
     * hace antes de escribir para responder 409 con un mensaje útil en lugar de
     * dejar que la restricción única de la BD reviente como un 500.
     */
    async assertUnique(username, email, excludeId) {
        const conflicts = await this.repository.findConflicts(username, email);
        const taken = conflicts.find((candidate) => candidate.id !== excludeId);
        if (!taken)
            return;
        if (taken.username === username.trim().toLowerCase()) {
            throw new app_error_1.AppError(409, "Username already in use");
        }
        throw new app_error_1.AppError(409, "Email already in use");
    }
}
exports.UsersService = UsersService;
//# sourceMappingURL=users.service.js.map