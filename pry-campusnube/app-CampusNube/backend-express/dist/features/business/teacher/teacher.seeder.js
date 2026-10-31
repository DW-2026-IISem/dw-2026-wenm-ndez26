"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.seedTeachers = seedTeachers;
const faker_1 = require("@faker-js/faker");
const teacher_model_1 = require("./teacher.model");
/**
 * Seeder del feature Teacher (datos falsos con @faker-js/faker).
 * Se invoca desde `src/database/seeders` (SeedersRunner), no desde la App.
 *
 * Idempotente: si ya hay filas, no vuelve a insertar.
 */
async function seedTeachers(count) {
    if (count <= 0) {
        console.log("⏭️  teachers: count=0, se omite");
        return 0;
    }
    const existing = await teacher_model_1.Teacher.count();
    if (existing > 0) {
        console.log(`⏭️  teachers: ya hay ${existing} registro(s), se omite seeder`);
        return 0;
    }
    const rows = Array.from({ length: count }, () => ({
        name: faker_1.faker.person.fullName(),
        description: faker_1.faker.lorem.sentence(),
        isActive: true,
    }));
    await teacher_model_1.Teacher.bulkCreate(rows);
    console.log(`✅ teachers: insertados ${count} registro(s) falsos`);
    return count;
}
//# sourceMappingURL=teacher.seeder.js.map