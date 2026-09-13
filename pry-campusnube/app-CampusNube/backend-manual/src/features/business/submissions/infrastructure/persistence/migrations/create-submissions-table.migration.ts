export const createSubmissionsTableMigration = {
  name: 'create-submissions-table',

  async up(): Promise<void> {
    // Sequelize sync handles table creation in development.
    // Production:
    // CREATE TABLE submissions (
    //   id,
    //   referenceId,
    //   startDate,
    //   endDate,
    //   total,
    //   status,
    //   observations,
    //   createdAt,
    //   updatedAt
    // )
  },

  async down(): Promise<void> {
    // Production: DROP TABLE submissions
  },
};
