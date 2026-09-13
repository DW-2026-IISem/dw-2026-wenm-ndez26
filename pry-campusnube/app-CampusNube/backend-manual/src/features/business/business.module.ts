import { Module } from '@nestjs/common';

import { CoursesModule } from './courses/courses.module.js';
import { ApprenticesModule } from './apprentices/apprentices.module.js';
import { EnrollmentModule } from './enrollment/enrollment.module.js';
import { LearningContentModule } from './learning-content/learning-content.module.js';
import { TeachersModule } from './teachers/teachers.module.js';
import { AssessmentsModule } from './assessments/assessments.module.js';
import { SubmissionsModule } from './submissions/submissions.module.js';
import { ProgressModule } from './progress/progress.module.js';
import { CertificatesModule } from './certificates/certificates.module.js';

@Module({
  imports: [
    CoursesModule,
    ApprenticesModule,
    EnrollmentModule,
    LearningContentModule,
    TeachersModule,
    AssessmentsModule,
    SubmissionsModule,
    ProgressModule,
    CertificatesModule,
  ],
  exports: [
    CoursesModule,
    ApprenticesModule,
    EnrollmentModule,
    LearningContentModule,
    TeachersModule,
    AssessmentsModule,
    SubmissionsModule,
    ProgressModule,
    CertificatesModule,
  ],
})
export class BusinessModule {}
