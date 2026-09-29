import { faker } from "@faker-js/faker";
import { Course } from "./course.model";

/**
 * Seeder del feature Course.
 * Se invoca desde `src/database/seeders` (SeedersRunner), no desde la App.
 *
 * Idempotente: si ya hay registros, no inserta nuevamente.
 */
export async function seedCourses(count: number): Promise<number> {
  if (count <= 0) {
    console.log("⏭️  courses: count=0, se omite");
    return 0;
  }

  const existing = await Course.count();

  if (existing > 0) {
    console.log(
      `⏭️  courses: ya hay ${existing} registro(s), se omite seeder`
    );
    return 0;
  }

  const rows = Array.from({ length: count }, () => ({
    name: faker.lorem.words(3),
    description: faker.lorem.sentence(),
    isActive: true,
  }));

  await Course.bulkCreate(rows);

  console.log(`✅ courses: insertados ${count} registro(s) falsos`);

  return count;
}
