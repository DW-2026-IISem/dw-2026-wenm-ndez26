export const createEvaluationsTableMigration = {
  name: 'create-evaluations-table',

  async up(): Promise<void> {
    // Sequelize sync handles table creation in development.
    // Production:
    // CREATE TABLE evaluations (
    //   id,
    //   courseId,
    //   name,
    //   description,
    //   isActive,
    //   createdAt,
    //   updatedAt
    // )
  },

  async down(): Promise<void> {
    // Production: DROP TABLE evaluations
  },
};
