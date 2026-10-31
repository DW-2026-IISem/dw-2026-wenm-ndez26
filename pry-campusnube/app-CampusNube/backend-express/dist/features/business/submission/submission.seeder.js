"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.seedSubmissions = seedSubmissions;
const faker_1 = require("@faker-js/faker");
const submission_model_1 = require("./submission.model");
const lesson_model_1 = require("../lesson/lesson.model");
const enrollment_model_1 = require("../enrollment/enrollment.model");
async function seedSubmissions(count) {
    if (count <= 0) {
        console.log("⏭️  submissions: count=0, se omite");
        return 0;
    }
    const existing = await submission_model_1.Submission.count();
    if (existing > 0) {
        console.log(`⏭️  submissions: ya hay ${existing} registro(s), se omite seeder`);
        return 0;
    }
    const lessons = await lesson_model_1.Lesson.findAll({
        where: {
            isActive: true,
        },
    });
    const enrollments = await enrollment_model_1.Enrollment.findAll({
        where: {
            status: "active",
        },
    });
    if (lessons.length === 0 || enrollments.length === 0) {
        console.log("⏭️  submissions: no hay lecciones o inscripciones activas, se omite seeder");
        return 0;
    }
    const rows = Array.from({ length: count }, (_, index) => {
        const lesson = lessons[index % lessons.length];
        const enrollment = enrollments[index % enrollments.length];
        return {
            referencia_id: lesson.id,
            lesson_id: lesson.id,
            enrollment_id: enrollment.id,
            fecha_inicio: faker_1.faker.date.recent({ days: 10 }),
            fecha_fin: faker_1.faker.date.recent({ days: 5 }),
            total: faker_1.faker.number.float({
                min: 0,
                max: 100,
                fractionDigits: 2,
            }),
            estado: "completada",
            observaciones: faker_1.faker.lorem.sentence(),
        };
    });
    await submission_model_1.Submission.bulkCreate(rows);
    console.log(`✅ submissions: insertados ${rows.length} registro(s) falsos`);
    return rows.length;
}
//# sourceMappingURL=submission.seeder.js.map