"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TeacherRepository = void 0;
const teacher_model_1 = require("./teacher.model");
class TeacherRepository {
    async findAllActive() {
        return teacher_model_1.Teacher.findAll({
            where: {
                isActive: true,
            },
        });
    }
    async findById(id, transaction, onlyActive = true) {
        return teacher_model_1.Teacher.findOne({
            where: {
                id,
                ...(onlyActive ? { isActive: true } : {}),
            },
            transaction,
        });
    }
    async create(data, transaction) {
        return teacher_model_1.Teacher.create(data, {
            transaction,
        });
    }
    async update(id, data, transaction) {
        const teacher = await teacher_model_1.Teacher.findByPk(id, {
            transaction,
        });
        if (!teacher) {
            return null;
        }
        await teacher.update(data, {
            transaction,
        });
        return teacher;
    }
    async delete(id, transaction) {
        return teacher_model_1.Teacher.destroy({
            where: {
                id,
            },
            transaction,
        });
    }
}
exports.TeacherRepository = TeacherRepository;
//# sourceMappingURL=teacher.repository.js.map