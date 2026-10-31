"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersRepository = void 0;
const sequelize_1 = require("sequelize");
const user_model_1 = require("./user.model");
/**
 * Capa Repository del feature Users.
 *
 * Única que habla con Sequelize (el modelo `User`). No contiene reglas de
 * negocio ni conoce `req`/`res`.
 *
 * Detalle de seguridad: las lecturas **normales** excluyen `password` en la
 * proyección SQL. Solo dos consultas lo incluyen, ambas con nombre explícito en
 * su firma (`...WithPassword`), de modo que un `findById` cualquiera jamás puede
 * devolver el hash por descuido.
 */
class UsersRepository {
    /** Todos los usuarios activos (sin `password`). */
    async findAllActive() {
        return user_model_1.User.findAll({
            where: { status: "active" },
            attributes: UsersRepository.WITHOUT_PASSWORD,
        });
    }
    /** Un usuario por PK (o `null`), sin `password`. Acepta transacción. */
    async findById(id, transaction) {
        return user_model_1.User.findByPk(id, {
            attributes: UsersRepository.WITHOUT_PASSWORD,
            transaction,
        });
    }
    /** Un usuario por PK **con** su hash. Uso exclusivo: cambio de contraseña. */
    async findByIdWithPassword(id) {
        return user_model_1.User.findByPk(id);
    }
    /**
     * Un usuario por `username` **o** `email`, con su hash.
     *
     * Uso exclusivo: validación de credenciales en el login (única operación que
     * lee la credencial). Normaliza el identificador a minúsculas para casar con
     * el valor almacenado.
     */
    async findByIdentifierWithPassword(identifier) {
        const value = identifier.trim().toLowerCase();
        return user_model_1.User.findOne({
            where: { [sequelize_1.Op.or]: [{ username: value }, { email: value }] },
        });
    }
    /** Busca por `username` o `email` (sin `password`) para detectar duplicados. */
    async findConflicts(username, email) {
        return user_model_1.User.findAll({
            where: {
                [sequelize_1.Op.or]: [
                    { username: username.trim().toLowerCase() },
                    { email: email.trim().toLowerCase() },
                ],
            },
            attributes: ["id", "username", "email"],
        });
    }
    /** Inserta un usuario (el hook del modelo hashea `password`). */
    async create(data) {
        return user_model_1.User.create(data);
    }
    /** Persiste cambios sobre una instancia existente. */
    async update(user, data) {
        return user.update(data);
    }
    /** Elimina físicamente una instancia. */
    async delete(user) {
        await user.destroy();
    }
}
exports.UsersRepository = UsersRepository;
/** Proyección sin credencial: la que usan todas las lecturas de API. */
UsersRepository.WITHOUT_PASSWORD = { exclude: ["password"] };
//# sourceMappingURL=users.repository.js.map