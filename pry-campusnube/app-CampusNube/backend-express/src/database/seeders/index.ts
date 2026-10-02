import dotenv from "dotenv";
import { sequelize, testConnection } from "../db";
import "../../features/business/learner/learner.model";
import "../../features/business/teacher/teacher.model";
import { seedLearners } from "../../features/business/learner/learner.seeder";
import { resolveSeedCounts } from "./counts";
import { seedTeachers } from "../../features/business/teacher/teacher.seeder";
import { seedCourses } from "../../features/business/course/course.seeder";
import { seedEnrollments } from "../../features/business/enrollment/enrollment.seeder";
import { seedEvaluations } from "../../features/business/evaluation/evaluation.seeder";
import { seedModules } from "../../features/business/module/module.seeder";
import { seedLessons } from "../../features/business/lesson/lesson.seeder";
import { seedAttempts } from "../../features/business/attempt/attempt.seeder";
import { seedSubmissions } from "../../features/business/submission/submission.seeder";
import { seedProgress } from "../../features/business/progress/progress.seeder";
import { seedCertificates } from "../../features/business/certificate/certificate.seeder";

// Fase II — Auth con RBAC: primero los seis modelos, después las asociaciones
import "../../features/auth/users/user.model";
import "../../features/auth/roles/role.model";
import "../../features/auth/resources/resource.model";
import "../../features/auth/role-users/role-user.model";
import "../../features/auth/resource-roles/resource-role.model";
import "../../features/auth/refresh-tokens/refresh-token.model";
import "../../features/auth/rbac.associations";
dotenv.config();

/**
 * SeedersRunner — ejecuta TODOS los seeders de features.
 *
 * Ubicación: `src/database/seeders/`
 *
 * Cada feature exporta su propio seeder.
 *
 * Uso:
 *   npm run db:seed
 *   npm run db:seed -- --learners=20
 *   SEED_LEARNERS=5 npm run db:seed
 */
export async function runAllSeeders(): Promise<void> {
  const counts = resolveSeedCounts();

  console.log("🌱 Iniciando SeedersRunner...");
  console.log("📊 Conteos:", counts);

  const ok = await testConnection();

  if (!ok) {
    throw new Error("No hay conexión a la base de datos");
  }

  await sequelize.sync({
    force: false,
    alter: true,
  });

  // Orden: business (padres → hijos)
  await seedLearners(counts.learners);
  await seedTeachers(counts.teachers);
  await seedCourses(counts.courses);
  await seedEnrollments(counts.enrollments);
  await seedEvaluations(counts.evaluations);
  await seedModules(counts.modules);
  await seedLessons(counts.lessons);
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
