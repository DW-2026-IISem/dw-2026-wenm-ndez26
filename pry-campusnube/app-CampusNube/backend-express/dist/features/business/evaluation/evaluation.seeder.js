"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.seedEvaluations = seedEvaluations;
const faker_1 = require("@faker-js/faker");
const evaluation_model_1 = require("./evaluation.model");
const course_model_1 = require("../course/course.model");
async function seedEvaluations(count) {
    if (count <= 0) {
        console.log("⏭️  evaluations: count=0, se omite");
        return 0;
    }
    const existing = await evaluation_model_1.Evaluation.count();
    if (existing > 0) {
        console.log(`⏭️  evaluations: ya hay ${existing} registro(s), se omite seeder`);
        return 0;
    }
    const courses = await course_model_1.Course.findAll({
        where: {
            isActive: true,
        },
    });
    if (courses.length === 0) {
        console.log("⏭️  evaluations: no hay cursos activos, se omite seeder");
        return 0;
    }
    const rows = Array.from({ length: count }, (_, index) => {
        const course = courses[index % courses.length];
        return {
            course_id: course.id,
            name: faker_1.faker.lorem.words(3),
            description: faker_1.faker.lorem.sentence(),
            isActive: true,
        };
    });
    await evaluation_model_1.Evaluation.bulkCreate(rows);
    console.log(`✅ evaluations: insertados ${rows.length} registro(s) falsos`);
    return rows.length;
}
//# sourceMappingURL=evaluation.seeder.js.map