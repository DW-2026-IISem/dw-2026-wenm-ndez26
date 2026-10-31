"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.seedModules = seedModules;
const faker_1 = require("@faker-js/faker");
const module_model_1 = require("./module.model");
const course_model_1 = require("../course/course.model");
async function seedModules(count) {
    if (count <= 0) {
        console.log("⏭️  modules: count=0, se omite");
        return 0;
    }
    const existing = await module_model_1.Module.count();
    if (existing > 0) {
        console.log(`⏭️  modules: ya hay ${existing} registro(s), se omite seeder`);
        return 0;
    }
    const courses = await course_model_1.Course.findAll({
        where: {
            isActive: true,
        },
    });
    if (courses.length === 0) {
        console.log("⏭️  modules: no hay cursos activos, se omite seeder");
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
    await module_model_1.Module.bulkCreate(rows);
    console.log(`✅ modules: insertados ${rows.length} registro(s) falsos`);
    return rows.length;
}
//# sourceMappingURL=module.seeder.js.map