export const createApprenticesTableMigration = {
  name: 'create-apprentices-table',

  async up(): Promise<void> {
    // Sequelize sync handles table creation in development.
    // Production:
    // CREATE TABLE apprentices
    // (id, name, description, status, createdAt, updatedAt)
  },

  async down(): Promise<void> {
    // Production:
    // DROP TABLE apprentices
  },
};
