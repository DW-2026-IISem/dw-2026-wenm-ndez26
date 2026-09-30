import { faker } from "@faker-js/faker";
import { Submission } from "./submission.model";
import { Lesson } from "../lesson/lesson.model";
import { Enrollment } from "../enrollment/enrollment.model";

export async function seedSubmissions(
  count: number
): Promise<number> {
  if (count <= 0) {
    console.log("⏭️  submissions: count=0, se omite");
    return 0;
  }

  const existing = await Submission.count();

  if (existing > 0) {
    console.log(
      `⏭️  submissions: ya hay ${existing} registro(s), se omite seeder`
    );
    return 0;
  }

  const lessons = await Lesson.findAll({
    where: {
      isActive: true,
    },
  });

  const enrollments = await Enrollment.findAll({
    where: {
      status: "active",
    },
  });

  if (lessons.length === 0 || enrollments.length === 0) {
    console.log(
      "⏭️  submissions: no hay lecciones o inscripciones activas, se omite seeder"
    );
    return 0;
  }

  const rows = Array.from({ length: count }, (_, index) => {
    const lesson = lessons[index % lessons.length];
    const enrollment = enrollments[index % enrollments.length];

    return {
      referencia_id: lesson.id,
      lesson_id: lesson.id,
      enrollment_id: enrollment.id,
      fecha_inicio: faker.date.recent({ days: 10 }),
      fecha_fin: faker.date.recent({ days: 5 }),
      total: faker.number.float({
        min: 0,
        max: 100,
        fractionDigits: 2,
      }),
      estado: "completada",
      observaciones: faker.lorem.sentence(),
    };
  });

  await Submission.bulkCreate(rows);

  console.log(
    `✅ submissions: insertados ${rows.length} registro(s) falsos`
  );

  return rows.length;
}
