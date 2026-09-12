import { EnrollmentModel } from '../models/enrollment.model.js';
import { Status } from '../../../../../../common/enums/status.enum.js';

export async function seedEnrollments(): Promise<void> {
  const count = await EnrollmentModel.count();

  if (count > 0) {
    return;
  }

  await EnrollmentModel.bulkCreate([
    {
      apprenticeId: 1,
      courseId: 1,
      status: Status.ACTIVE,
      enrolledAt: new Date(),
    },
    {
      apprenticeId: 1,
      courseId: 2,
      status: Status.ACTIVE,
      enrolledAt: new Date(),
    },
  ]);
}
