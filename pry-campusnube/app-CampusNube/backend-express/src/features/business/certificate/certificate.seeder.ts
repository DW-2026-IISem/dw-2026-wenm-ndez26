import { faker } from "@faker-js/faker";
import { Certificate } from "./certificate.model";
import { Enrollment } from "../enrollment/enrollment.model";

export async function seedCertificates(
  count: number
): Promise<number> {

  if (count <= 0) {
    console.log("⏭️  certificates: count=0, se omite");
    return 0;
  }

  const existing = await Certificate.count();

  if (existing > 0) {
    console.log(
      `⏭️  certificates: ya hay ${existing} registro(s), se omite seeder`
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
      "⏭️  certificates: no hay inscripciones activas, se omite seeder"
    );
    return 0;
  }

  const rows = enrollments
    .slice(0, count)
    .map((enrollment) => ({
      enrollment_id: enrollment.id,
      name: faker.lorem.words(3),
      description: faker.lorem.sentence(),
      isActive: true,
    }));

  await Certificate.bulkCreate(rows);

  console.log(
    `✅ certificates: insertados ${rows.length} registro(s) falsos`
  );

  return rows.length;
}
