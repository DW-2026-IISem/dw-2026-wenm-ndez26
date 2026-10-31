"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.seedLessons = seedLessons;
const faker_1 = require("@faker-js/faker");
const lesson_model_1 = require("./lesson.model");
const module_model_1 = require("../module/module.model");
async function seedLessons(count) {
    if (count <= 0) {
        console.log("⏭️  lessons: count=0, se omite");
        return 0;
    }
    const existing = await lesson_model_1.Lesson.count();
    if (existing > 0) {
        console.log(`⏭️  lessons: ya hay ${existing} registro(s), se omite seeder`);
        return 0;
    }
    const modules = await module_model_1.Module.findAll({
        where: {
            isActive: true,
        },
    });
    if (modules.length === 0) {
        console.log("⏭️  lessons: no hay módulos activos, se omite seeder");
        return 0;
    }
    const rows = Array.from({ length: count }, (_, index) => {
        const module = modules[index % modules.length];
        return {
            module_id: module.id,
            name: faker_1.faker.lorem.words(3),
            description: faker_1.faker.lorem.sentence(),
            isActive: true,
        };
    });
    await lesson_model_1.Lesson.bulkCreate(rows);
    console.log(`✅ lessons: insertados ${rows.length} registro(s) falsos`);
    return rows.length;
}
//# sourceMappingURL=lesson.seeder.js.map