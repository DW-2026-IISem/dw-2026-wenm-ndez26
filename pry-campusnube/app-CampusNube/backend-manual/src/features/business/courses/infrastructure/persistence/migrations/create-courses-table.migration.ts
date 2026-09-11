export const createCoursesTableMigration = {
  name: 'create-courses-table',

  async up(): Promise<void> {
    // Sequelize sync handles table creation in development.
    // Production: CREATE TABLE courses
    // (id, name, description, status, createdAt, updatedAt)
  },

  async down(): Promise<void> {
    // Production: DROP TABLE courses
  },
};
