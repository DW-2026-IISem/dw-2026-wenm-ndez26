"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.seedEnrollments = seedEnrollments;
const faker_1 = require("@faker-js/faker");
const enrollment_model_1 = require("./enrollment.model");
const learner_model_1 = require("../learner/learner.model");
const course_model_1 = require("../course/course.model");
async function seedEnrollments(count) {
    if (count <= 0) {
        console.log("⏭️  enrollments: count=0, se omite");
        return 0;
    }
    const existing = await enrollment_model_1.Enrollment.count();
    if (existing > 0) {
        console.log(`⏭️  enrollments: ya hay ${existing} registro(s), se omite seeder`);
        return 0;
    }
    const learners = await learner_model_1.Learner.findAll({
        where: { status: "active" },
    });
    const courses = await course_model_1.Course.findAll({
        where: { isActive: true },
    });
    if (learners.length === 0 || courses.length === 0) {
        console.log("⏭️  enrollments: faltan aprendices o cursos activos, se omite seeder");
        return 0;
    }
    const rows = Array.from({ length: count }, (_, index) => {
        const learner = learners[index % learners.length];
        const course = courses[index % courses.length];
        return {
            learner_id: learner.id,
            course_id: course.id,
            enrollment_date: faker_1.faker.date.recent({ days: 30 }),
            status: "active",
        };
    });
    await enrollment_model_1.Enrollment.bulkCreate(rows);
    console.log(`✅ enrollments: insertados ${rows.length} registro(s) falsos`);
    return rows.length;
}
//# sourceMappingURL=enrollment.seeder.js.map