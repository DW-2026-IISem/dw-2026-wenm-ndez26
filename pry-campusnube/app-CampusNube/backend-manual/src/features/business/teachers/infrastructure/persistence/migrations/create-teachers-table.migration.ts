export const createTeachersTableMigration = {
  name: 'create-teachers-table',

  async up(): Promise<void> {
    // Sequelize sync handles table creation in development.
    // Production:
    // CREATE TABLE teachers (
    //   id,
    //   name,
    //   description,
    //   isActive,
    //   createdAt,
    //   updatedAt
    // )
  },

  async down(): Promise<void> {
    // Production: DROP TABLE teachers
  },
};
