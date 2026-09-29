import { faker } from "@faker-js/faker";
import { Enrollment } from "./enrollment.model";
import { Learner } from "../learner/learner.model";
import { Course } from "../course/course.model";

export async function seedEnrollments(count: number): Promise<number> {
  if (count <= 0) {
    console.log("⏭️  enrollments: count=0, se omite");
    return 0;
  }

  const existing = await Enrollment.count();

  if (existing > 0) {
    console.log(
      `⏭️  enrollments: ya hay ${existing} registro(s), se omite seeder`
    );
    return 0;
  }

  const learners = await Learner.findAll({
  where: { status: "active" },
});

  const courses = await Course.findAll({
    where: { isActive: true },
  });

  if (learners.length === 0 || courses.length === 0) {
    console.log(
      "⏭️  enrollments: faltan aprendices o cursos activos, se omite seeder"
    );
    return 0;
  }

  const rows = Array.from({ length: count }, (_, index) => {
    const learner = learners[index % learners.length];
    const course = courses[index % courses.length];

    return {
      learner_id: learner.id,
      course_id: course.id,
      enrollment_date: faker.date.recent({ days: 30 }),
      status: "active" as const,
    };
  });

  await Enrollment.bulkCreate(rows);

  console.log(
    `✅ enrollments: insertados ${rows.length} registro(s) falsos`
  );

  return rows.length;
}