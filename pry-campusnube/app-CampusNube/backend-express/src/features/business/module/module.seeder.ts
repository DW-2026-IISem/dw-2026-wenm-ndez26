import { faker } from "@faker-js/faker";
import { Module } from "./module.model";
import { Course } from "../course/course.model";

export async function seedModules(count: number): Promise<number> {
  if (count <= 0) {
    console.log("⏭️  modules: count=0, se omite");
    return 0;
  }

  const existing = await Module.count();

  if (existing > 0) {
    console.log(
      `⏭️  modules: ya hay ${existing} registro(s), se omite seeder`
    );
    return 0;
  }

  const courses = await Course.findAll({
    where: {
      isActive: true,
    },
  });

  if (courses.length === 0) {
    console.log(
      "⏭️  modules: no hay cursos activos, se omite seeder"
    );
    return 0;
  }

  const rows = Array.from({ length: count }, (_, index) => {
    const course = courses[index % courses.length];

    return {
      course_id: course.id,
      name: faker.lorem.words(3),
      description: faker.lorem.sentence(),
      isActive: true,
    };
  });

  await Module.bulkCreate(rows);

  console.log(
    `✅ modules: insertados ${rows.length} registro(s) falsos`
  );

  return rows.length;
}
