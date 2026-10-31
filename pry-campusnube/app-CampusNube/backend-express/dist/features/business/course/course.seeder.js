"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.seedCourses = seedCourses;
const faker_1 = require("@faker-js/faker");
const course_model_1 = require("./course.model");
/**
 * Seeder del feature Course.
 * Se invoca desde `src/database/seeders` (SeedersRunner), no desde la App.
 *
 * Idempotente: si ya hay registros, no inserta nuevamente.
 */
async function seedCourses(count) {
    if (count <= 0) {
        console.log("⏭️  courses: count=0, se omite");
        return 0;
    }
    const existing = await course_model_1.Course.count();
    if (existing > 0) {
        console.log(`⏭️  courses: ya hay ${existing} registro(s), se omite seeder`);
        return 0;
    }
    const rows = Array.from({ length: count }, () => ({
        name: faker_1.faker.lorem.words(3),
        description: faker_1.faker.lorem.sentence(),
        isActive: true,
    }));
    await course_model_1.Course.bulkCreate(rows);
    console.log(`✅ courses: insertados ${count} registro(s) falsos`);
    return count;
}
//# sourceMappingURL=course.seeder.js.map