import { faker } from "@faker-js/faker";
import { Teacher } from "./teacher.model";

/**
 * Seeder del feature Teacher (datos falsos con @faker-js/faker).
 * Se invoca desde `src/database/seeders` (SeedersRunner), no desde la App.
 *
 * Idempotente: si ya hay filas, no vuelve a insertar.
 */
export async function seedTeachers(count: number): Promise<number> {
  if (count <= 0) {
    console.log("⏭️  teachers: count=0, se omite");
    return 0;
  }

  const existing = await Teacher.count();

  if (existing > 0) {
    console.log(
      `⏭️  teachers: ya hay ${existing} registro(s), se omite seeder`
    );
    return 0;
  }

  const rows = Array.from({ length: count }, () => ({
    name: faker.person.fullName(),
    description: faker.lorem.sentence(),
    isActive: true,
  }));

  await Teacher.bulkCreate(rows);

  console.log(
    `✅ teachers: insertados ${count} registro(s) falsos`
  );

  return count;
}
