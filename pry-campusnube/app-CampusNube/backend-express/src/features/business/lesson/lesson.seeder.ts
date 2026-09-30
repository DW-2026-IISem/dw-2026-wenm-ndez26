import { faker } from "@faker-js/faker";
import { Lesson } from "./lesson.model";
import { Module } from "../module/module.model";

export async function seedLessons(count: number): Promise<number> {
  if (count <= 0) {
    console.log("⏭️  lessons: count=0, se omite");
    return 0;
  }

  const existing = await Lesson.count();

  if (existing > 0) {
    console.log(
      `⏭️  lessons: ya hay ${existing} registro(s), se omite seeder`
    );
    return 0;
  }

  const modules = await Module.findAll({
    where: {
      isActive: true,
    },
  });

  if (modules.length === 0) {
    console.log(
      "⏭️  lessons: no hay módulos activos, se omite seeder"
    );
    return 0;
  }

  const rows = Array.from({ length: count }, (_, index) => {
    const module = modules[index % modules.length];

    return {
      module_id: module.id,
      name: faker.lorem.words(3),
      description: faker.lorem.sentence(),
      isActive: true,
    };
  });

  await Lesson.bulkCreate(rows);

  console.log(
    `✅ lessons: insertados ${rows.length} registro(s) falsos`
  );

  return rows.length;
}
