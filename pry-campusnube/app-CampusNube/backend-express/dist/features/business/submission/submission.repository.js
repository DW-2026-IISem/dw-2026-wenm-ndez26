"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SubmissionRepository = void 0;
const sequelize_1 = require("sequelize");
const lesson_model_1 = require("../lesson/lesson.model");
const enrollment_model_1 = require("../enrollment/enrollment.model");
const submission_model_1 = require("./submission.model");
/**
 * Repository de Submission.
 *
 * Única capa responsable de acceder a Sequelize.
 */
class SubmissionRepository {
    // ================== READ ==================
    async findAll() {
        return submission_model_1.Submission.findAll({
            where: {
                estado: {
                    [sequelize_1.Op.ne]: "inactivo",
                },
            },
        });
    }
    async findById(id) {
        return submission_model_1.Submission.findOne({
            where: {
                id,
                estado: {
                    [sequelize_1.Op.ne]: "inactivo",
                },
            },
        });
    }
    // ================== VALIDACIONES ==================
    async findActiveLesson(lessonId) {
        return lesson_model_1.Lesson.findOne({
            where: {
                id: lessonId,
                isActive: true,
            },
        });
    }
    async findActiveEnrollment(enrollmentId) {
        return enrollment_model_1.Enrollment.findOne({
            where: {
                id: enrollmentId,
                status: "active",
            },
        });
    }
    // ================== CREATE ==================
    async create(data) {
        return submission_model_1.Submission.create({
            referencia_id: data.referencia_id,
            lesson_id: data.lesson_id,
            enrollment_id: data.enrollment_id,
            fecha_inicio: data.fecha_inicio,
            fecha_fin: data.fecha_fin ?? null,
            total: data.total ?? null,
            estado: data.estado,
            observaciones: data.observaciones ?? null,
        });
    }
    // ================== UPDATE ==================
    async update(submission, data) {
        await submission.update({
            referencia_id: data.referencia_id,
            lesson_id: data.lesson_id,
            enrollment_id: data.enrollment_id,
            fecha_inicio: data.fecha_inicio,
            fecha_fin: data.fecha_fin ?? null,
            total: data.total ?? null,
            observaciones: data.observaciones ?? null,
        });
        return submission;
    }
    async patch(submission, data) {
        await submission.update({
            ...(data.referencia_id !== undefined && {
                referencia_id: data.referencia_id,
            }),
            ...(data.lesson_id !== undefined && {
                lesson_id: data.lesson_id,
            }),
            ...(data.enrollment_id !== undefined && {
                enrollment_id: data.enrollment_id,
            }),
            ...(data.fecha_inicio !== undefined && {
                fecha_inicio: data.fecha_inicio,
            }),
            ...(data.fecha_fin !== undefined && {
                fecha_fin: data.fecha_fin,
            }),
            ...(data.total !== undefined && {
                total: data.total,
            }),
            ...(data.observaciones !== undefined && {
                observaciones: data.observaciones,
            }),
        });
        return submission;
    }
    // ================== DELETE ==================
    async delete(submission) {
        await submission.destroy();
    }
    async deactivate(submission) {
        await submission.update({
            estado: "inactivo",
        });
        return submission;
    }
}
exports.SubmissionRepository = SubmissionRepository;
//# sourceMappingURL=submission.repository.js.map