import dotenv from "dotenv";

import { sequelize, testConnection } from "../db";

// ============================================================
// Fase I — Business: modelos
// ============================================================
import "../../features/business/learner/learner.model";
import "../../features/business/teacher/teacher.model";
import "../../features/business/course/course.model";
import "../../features/business/module/module.model";
import "../../features/business/lesson/lesson.model";
import "../../features/business/enrollment/enrollment.model";
import "../../features/business/evaluation/evaluation.model";
import "../../features/business/attempt/attempt.model";
import "../../features/business/submission/submission.model";
import "../../features/business/progress/progress.model";
import "../../features/business/certificate/certificate.model";

// ============================================================
// Fase I — Business: asociaciones
// ============================================================
import "../../features/business/enrollment/enrollment.associations";
import "../../features/business/course/course.associations";
import "../../features/business/module/module.associations";
import "../../features/business/lesson/lesson.associations";
import "../../features/business/evaluation/evaluation.associations";
import "../../features/business/attempt/attempt.associations";
import "../../features/business/submission/submission.associations";
import "../../features/business/progress/progress.associations";
import "../../features/business/certificate/certificate.associations";

// ============================================================
// Fase II — Auth con RBAC
// ============================================================
import "../../features/auth/users/user.model";
import "../../features/auth/roles/role.model";
import "../../features/auth/resources/resource.model";
import "../../features/auth/role-users/role-user.model";
import "../../features/auth/resource-roles/resource-role.model";
import "../../features/auth/refresh-tokens/refresh-token.model";
import "../../features/auth/rbac.associations";

// ============================================================
// Seeders — Auth
// ============================================================
import { seedRoles } from "../../features/auth/roles/roles.seeder";
import { seedResources } from "../../features/auth/resources/resources.seeder";
import { seedUsers } from "../../features/auth/users/users.seeder";
import { seedRoleUsers } from "../../features/auth/role-users/role-users.seeder";
import { seedResourceRoles } from "../../features/auth/resource-roles/resource-roles.seeder";

// ============================================================
// Seeders — Business CampusNube
// ============================================================
import { seedLearners } from "../../features/business/learner/learner.seeder";
import { seedTeachers } from "../../features/business/teacher/teacher.seeder";
import { seedCourses } from "../../features/business/course/course.seeder";
import { seedModules } from "../../features/business/module/module.seeder";
import { seedLessons } from "../../features/business/lesson/lesson.seeder";
import { seedEnrollments } from "../../features/business/enrollment/enrollment.seeder";
import { seedEvaluations } from "../../features/business/evaluation/evaluation.seeder";
import { seedAttempts } from "../../features/business/attempt/attempt.seeder";
import { seedSubmissions } from "../../features/business/submission/submission.seeder";
import { seedProgress } from "../../features/business/progress/progress.seeder";
import { seedCertificates } from "../../features/business/certificate/certificate.seeder";

import { resolveSeedCounts } from "./counts";

dotenv.config();

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
export async function runAllSeeders(): Promise<void> {
  const counts = resolveSeedCounts();

  console.log("🌱 Iniciando SeedersRunner...");
  console.log("📊 Conteos:", counts);

  const ok = await testConnection();

  if (!ok) {
    throw new Error("No hay conexión a la base de datos");
  }

  const isMysql =
    sequelize.getDialect() === "mysql" ||
    sequelize.getDialect() === "mariadb";

  if (isMysql) {
    await sequelize.query("SET FOREIGN_KEY_CHECKS = 0");
  }

  try {
    await sequelize.sync({
      force: false,
      alter: true,
    });
  } finally {
    if (isMysql) {
      await sequelize.query("SET FOREIGN_KEY_CHECKS = 1");
    }
  }

  // ==========================================================
  // Fase II — Auth con RBAC
  // El orden respeta las dependencias de seguridad.
  // ==========================================================
  await seedRoles();
  await seedResources();
  await seedUsers(counts.users);
  await seedRoleUsers();
  await seedResourceRoles();

  // ==========================================================
  // Fase I — Business CampusNube
  // Padres → hijos.
  // ==========================================================
  await seedLearners(counts.learners);
  await seedTeachers(counts.teachers);
  await seedCourses(counts.courses);
  await seedModules(counts.modules);
  await seedLessons(counts.lessons);
  await seedEnrollments(counts.enrollments);
  await seedEvaluations(counts.evaluations);
  await seedAttempts(counts.attempts);
  await seedSubmissions(counts.submissions);
  await seedProgress(counts.progress);
  await seedCertificates(counts.certificates);

  console.log("🌱 SeedersRunner finalizado");
}

if (require.main === module) {
  runAllSeeders()
    .then(async () => {
      await sequelize.close();
      process.exit(0);
    })
    .catch(async (err) => {
      console.error("❌ Error en seeders:", err);
      await sequelize.close();
      process.exit(1);
    });
}
