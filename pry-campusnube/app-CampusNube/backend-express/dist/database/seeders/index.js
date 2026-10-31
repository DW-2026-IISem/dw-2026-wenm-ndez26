"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.runAllSeeders = runAllSeeders;
const dotenv_1 = __importDefault(require("dotenv"));
const db_1 = require("../db");
// ============================================================
// Fase I — Business: modelos
// ============================================================
require("../../features/business/learner/learner.model");
require("../../features/business/teacher/teacher.model");
require("../../features/business/course/course.model");
require("../../features/business/module/module.model");
require("../../features/business/lesson/lesson.model");
require("../../features/business/enrollment/enrollment.model");
require("../../features/business/evaluation/evaluation.model");
require("../../features/business/attempt/attempt.model");
require("../../features/business/submission/submission.model");
require("../../features/business/progress/progress.model");
require("../../features/business/certificate/certificate.model");
// ============================================================
// Fase I — Business: asociaciones
// ============================================================
require("../../features/business/enrollment/enrollment.associations");
require("../../features/business/course/course.associations");
require("../../features/business/module/module.associations");
require("../../features/business/lesson/lesson.associations");
require("../../features/business/evaluation/evaluation.associations");
require("../../features/business/attempt/attempt.associations");
require("../../features/business/submission/submission.associations");
require("../../features/business/progress/progress.associations");
require("../../features/business/certificate/certificate.associations");
// ============================================================
// Fase II — Auth con RBAC
// ============================================================
require("../../features/auth/users/user.model");
require("../../features/auth/roles/role.model");
require("../../features/auth/resources/resource.model");
require("../../features/auth/role-users/role-user.model");
require("../../features/auth/resource-roles/resource-role.model");
require("../../features/auth/refresh-tokens/refresh-token.model");
require("../../features/auth/rbac.associations");
// ============================================================
// Seeders — Auth
// ============================================================
const roles_seeder_1 = require("../../features/auth/roles/roles.seeder");
const resources_seeder_1 = require("../../features/auth/resources/resources.seeder");
const users_seeder_1 = require("../../features/auth/users/users.seeder");
const role_users_seeder_1 = require("../../features/auth/role-users/role-users.seeder");
const resource_roles_seeder_1 = require("../../features/auth/resource-roles/resource-roles.seeder");
// ============================================================
// Seeders — Business CampusNube
// ============================================================
const learner_seeder_1 = require("../../features/business/learner/learner.seeder");
const teacher_seeder_1 = require("../../features/business/teacher/teacher.seeder");
const course_seeder_1 = require("../../features/business/course/course.seeder");
const module_seeder_1 = require("../../features/business/module/module.seeder");
const lesson_seeder_1 = require("../../features/business/lesson/lesson.seeder");
const enrollment_seeder_1 = require("../../features/business/enrollment/enrollment.seeder");
const evaluation_seeder_1 = require("../../features/business/evaluation/evaluation.seeder");
const attempt_seeder_1 = require("../../features/business/attempt/attempt.seeder");
const submission_seeder_1 = require("../../features/business/submission/submission.seeder");
const progress_seeder_1 = require("../../features/business/progress/progress.seeder");
const certificate_seeder_1 = require("../../features/business/certificate/certificate.seeder");
const counts_1 = require("./counts");
dotenv_1.default.config();
/**
 * SeedersRunner — ejecuta los seeders de todas las tablas
 * de CampusNube.
 *
 * Orden:
 *
 * Fase II — Auth con RBAC
 * roles → resources → users → role_users → resource_roles
 *
 * Fase I — Business
 * learners → teachers → courses → modules → lessons
 * → enrollments → evaluations → attempts → submissions
 * → progress → certificates
 *
 * La seguridad se ejecuta primero porque deja el sistema
 * operable de inmediato: usuarios, roles y concesiones.
 *
 * Los seeders de catálogo de seguridad son deterministas
 * y reconciliadores.
 *
 * Ejecutar todos los seeders:
 *
 *   npm run db:seed
 *
 * Variar cantidades:
 *
 *   npm run db:seed -- --learners=20 --teachers=5 --courses=10
 *
 * Variables de entorno:
 *
 *   SEED_LEARNERS=20
 *   SEED_TEACHERS=5
 *   SEED_COURSES=10
 */
async function runAllSeeders() {
    const counts = (0, counts_1.resolveSeedCounts)();
    console.log("🌱 Iniciando SeedersRunner...");
    console.log("📊 Conteos:", counts);
    const ok = await (0, db_1.testConnection)();
    if (!ok) {
        throw new Error("No hay conexión a la base de datos");
    }
    const isMysql = db_1.sequelize.getDialect() === "mysql" ||
        db_1.sequelize.getDialect() === "mariadb";
    if (isMysql) {
        await db_1.sequelize.query("SET FOREIGN_KEY_CHECKS = 0");
    }
    try {
        await db_1.sequelize.sync({
            force: false,
            alter: true,
        });
    }
    finally {
        if (isMysql) {
            await db_1.sequelize.query("SET FOREIGN_KEY_CHECKS = 1");
        }
    }
    // ==========================================================
    // Fase II — Auth con RBAC
    // El orden respeta las dependencias de seguridad.
    // ==========================================================
    await (0, roles_seeder_1.seedRoles)();
    await (0, resources_seeder_1.seedResources)();
    await (0, users_seeder_1.seedUsers)(counts.users);
    await (0, role_users_seeder_1.seedRoleUsers)();
    await (0, resource_roles_seeder_1.seedResourceRoles)();
    // ==========================================================
    // Fase I — Business CampusNube
    // Padres → hijos.
    // ==========================================================
    await (0, learner_seeder_1.seedLearners)(counts.learners);
    await (0, teacher_seeder_1.seedTeachers)(counts.teachers);
    await (0, course_seeder_1.seedCourses)(counts.courses);
    await (0, module_seeder_1.seedModules)(counts.modules);
    await (0, lesson_seeder_1.seedLessons)(counts.lessons);
    await (0, enrollment_seeder_1.seedEnrollments)(counts.enrollments);
    await (0, evaluation_seeder_1.seedEvaluations)(counts.evaluations);
    await (0, attempt_seeder_1.seedAttempts)(counts.attempts);
    await (0, submission_seeder_1.seedSubmissions)(counts.submissions);
    await (0, progress_seeder_1.seedProgress)(counts.progress);
    await (0, certificate_seeder_1.seedCertificates)(counts.certificates);
    console.log("🌱 SeedersRunner finalizado");
}
if (require.main === module) {
    runAllSeeders()
        .then(async () => {
        await db_1.sequelize.close();
        process.exit(0);
    })
        .catch(async (err) => {
        console.error("❌ Error en seeders:", err);
        await db_1.sequelize.close();
        process.exit(1);
    });
}
//# sourceMappingURL=index.js.map