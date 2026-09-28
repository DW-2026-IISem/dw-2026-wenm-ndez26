import { faker } from "@faker-js/faker";
import { Learner } from "./learner.model";

/**
 * Seeder del feature Learner (datos falsos con @faker-js/faker).
 *
 * Se invoca desde `src/database/seeders` (SeedersRunner),
 * no desde la App.
 *
 * Idempotente: si ya hay filas, no vuelve a insertar.
 */
export async function seedLearners(count: number): Promise<number> {
  if (count <= 0) {
    console.log("⏭️  learners: count=0, se omite");
    return 0;
  }

  const existing = await Learner.count();

  if (existing > 0) {
    console.log(
      `⏭️  learners: ya hay ${existing} registro(s), se omite seeder`
    );
    return 0;
  }

  const rows = Array.from({ length: count }, (_, i) => ({
    name: faker.person.fullName(),
    description: faker.lorem.sentence(),
    password: "Password123!",
    status: "active" as const,
  }));

  await Learner.bulkCreate(rows);

  console.log(
    `✅ learners: insertados ${count} registro(s) falsos`
  );

  return count;
}
