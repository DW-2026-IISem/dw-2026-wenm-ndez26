"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CourseRepository = void 0;
const course_model_1 = require("./course.model");
class CourseRepository {
    async findAllActive() {
        return course_model_1.Course.findAll({
            where: {
                isActive: true,
            },
        });
    }
    async findById(id, transaction, onlyActive = true) {
        return course_model_1.Course.findOne({
            where: {
                id,
                ...(onlyActive ? { isActive: true } : {}),
            },
            transaction,
        });
    }
    async create(data, transaction) {
        return course_model_1.Course.create(data, {
            transaction,
        });
    }
    async update(id, data, transaction) {
        const course = await course_model_1.Course.findByPk(id, {
            transaction,
        });
        if (!course) {
            return null;
        }
        await course.update(data, {
            transaction,
        });
        return course;
    }
    async delete(id, transaction) {
        return course_model_1.Course.destroy({
            where: {
                id,
            },
            transaction,
        });
    }
}
exports.CourseRepository = CourseRepository;
//# sourceMappingURL=course.repository.js.map