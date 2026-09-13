export const createAttemptsTableMigration = {
  name: 'create-attempts-table',

  async up(): Promise<void> {
    // Sequelize sync handles table creation in development.
    // Production:
    // CREATE TABLE attempts (
    //   id,
    //   enrollmentId,
    //   name,
    //   description,
    //   isActive,
    //   createdAt,
    //   updatedAt
    // )
  },

  async down(): Promise<void> {
    // Production: DROP TABLE attempts
  },
};
