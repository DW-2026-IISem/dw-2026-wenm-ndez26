import { faker } from "@faker-js/faker";
import { Progress } from "./progress.model";
import { Enrollment } from "../enrollment/enrollment.model";

export async function seedProgress(count: number): Promise<number> {
  if (count <= 0) {
    console.log("⏭️  progress: count=0, se omite");
    return 0;
  }

  const existing = await Progress.count();

  if (existing > 0) {
    console.log(
      `⏭️  progress: ya hay ${existing} registro(s), se omite seeder`
    );
    return 0;
  }

  const enrollments = await Enrollment.findAll({
    where: {
      status: "active",
    },
  });

  if (enrollments.length === 0) {
    console.log(
      "⏭️  progress: no hay inscripciones activas, se omite seeder"
    );
    return 0;
  }

  const rows = Array.from({ length: count }, (_, index) => {
    const enrollment =
      enrollments[index % enrollments.length];

    return {
      enrollment_id: enrollment.id,
      name: faker.lorem.words(3),
      description: faker.lorem.sentence(),
      isActive: true,
    };
  });

  await Progress.bulkCreate(rows);

  console.log(
    `✅ progress: insertados ${rows.length} registro(s) falsos`
  );

  return rows.length;
}
