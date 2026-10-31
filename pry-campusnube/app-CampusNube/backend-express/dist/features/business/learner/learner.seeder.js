"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.seedLearners = seedLearners;
const faker_1 = require("@faker-js/faker");
const learner_model_1 = require("./learner.model");
/**
 * Seeder del feature Learner (datos falsos con @faker-js/faker).
 *
 * Se invoca desde `src/database/seeders` (SeedersRunner),
 * no desde la App.
 *
 * Idempotente: si ya hay filas, no vuelve a insertar.
 */
async function seedLearners(count) {
    if (count <= 0) {
        console.log("⏭️  learners: count=0, se omite");
        return 0;
    }
    const existing = await learner_model_1.Learner.count();
    if (existing > 0) {
        console.log(`⏭️  learners: ya hay ${existing} registro(s), se omite seeder`);
        return 0;
    }
    const rows = Array.from({ length: count }, (_, i) => ({
        name: faker_1.faker.person.fullName(),
        description: faker_1.faker.lorem.sentence(),
        password: "Password123!",
        status: "active",
    }));
    await learner_model_1.Learner.bulkCreate(rows);
    console.log(`✅ learners: insertados ${count} registro(s) falsos`);
    return count;
}
//# sourceMappingURL=learner.seeder.js.map