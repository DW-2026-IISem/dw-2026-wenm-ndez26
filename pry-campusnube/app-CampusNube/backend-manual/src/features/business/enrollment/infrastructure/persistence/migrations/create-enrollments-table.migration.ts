export const createEnrollmentsTableMigration = {
  name: 'create-enrollments-table',

  async up(): Promise<void> {
    // Sequelize sync handles table creation in development.
    // Production: CREATE TABLE enrollments
    // (id, apprenticeId, courseId, status, enrolledAt, createdAt, updatedAt)
  },

  async down(): Promise<void> {
    // Production: DROP TABLE enrollments
  },
};
