import { SubmissionModel } from '../models/submission.model.js';

export async function seedSubmissions(): Promise<void> {
  const existing = await SubmissionModel.count();

  if (existing > 0) {
    return;
  }

  await SubmissionModel.bulkCreate([
    {
      referenceId: 1,
      startDate: new Date('2026-09-01T08:00:00'),
      endDate: new Date('2026-09-01T10:00:00'),
      total: 85,
      status: 'COMPLETED',
      observations: 'Entrega realizada correctamente.',
    },
    {
      referenceId: 1,
      startDate: new Date('2026-09-02T09:00:00'),
      endDate: new Date('2026-09-02T11:00:00'),
      total: 90,
      status: 'COMPLETED',
      observations: 'Entrega con buen desempeño.',
    },
  ]);
}
