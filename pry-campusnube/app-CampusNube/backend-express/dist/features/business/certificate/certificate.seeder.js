"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.seedCertificates = seedCertificates;
const faker_1 = require("@faker-js/faker");
const certificate_model_1 = require("./certificate.model");
const enrollment_model_1 = require("../enrollment/enrollment.model");
async function seedCertificates(count) {
    if (count <= 0) {
        console.log("⏭️  certificates: count=0, se omite");
        return 0;
    }
    const existing = await certificate_model_1.Certificate.count();
    if (existing > 0) {
        console.log(`⏭️  certificates: ya hay ${existing} registro(s), se omite seeder`);
        return 0;
    }
    const enrollments = await enrollment_model_1.Enrollment.findAll({
        where: {
            status: "active",
        },
    });
    if (enrollments.length === 0) {
        console.log("⏭️  certificates: no hay inscripciones activas, se omite seeder");
        return 0;
    }
    const rows = enrollments
        .slice(0, count)
        .map((enrollment) => ({
        enrollment_id: enrollment.id,
        name: faker_1.faker.lorem.words(3),
        description: faker_1.faker.lorem.sentence(),
        isActive: true,
    }));
    await certificate_model_1.Certificate.bulkCreate(rows);
    console.log(`✅ certificates: insertados ${rows.length} registro(s) falsos`);
    return rows.length;
}
//# sourceMappingURL=certificate.seeder.js.map