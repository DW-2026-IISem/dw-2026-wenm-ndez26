"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.seedProgress = seedProgress;
const faker_1 = require("@faker-js/faker");
const progress_model_1 = require("./progress.model");
const enrollment_model_1 = require("../enrollment/enrollment.model");
async function seedProgress(count) {
    if (count <= 0) {
        console.log("⏭️  progress: count=0, se omite");
        return 0;
    }
    const existing = await progress_model_1.Progress.count();
    if (existing > 0) {
        console.log(`⏭️  progress: ya hay ${existing} registro(s), se omite seeder`);
        return 0;
    }
    const enrollments = await enrollment_model_1.Enrollment.findAll({
        where: {
            status: "active",
        },
    });
    if (enrollments.length === 0) {
        console.log("⏭️  progress: no hay inscripciones activas, se omite seeder");
        return 0;
    }
    const rows = Array.from({ length: count }, (_, index) => {
        const enrollment = enrollments[index % enrollments.length];
        return {
            enrollment_id: enrollment.id,
            name: faker_1.faker.lorem.words(3),
            description: faker_1.faker.lorem.sentence(),
            isActive: true,
        };
    });
    await progress_model_1.Progress.bulkCreate(rows);
    console.log(`✅ progress: insertados ${rows.length} registro(s) falsos`);
    return rows.length;
}
//# sourceMappingURL=progress.seeder.js.map