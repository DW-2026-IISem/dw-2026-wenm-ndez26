export const createLearningContentTablesMigration = {
  name: 'create-learning-content-tables',

  async up(): Promise<void> {
    // Sequelize sync handles table creation in development.
    //
    // Production:
    // CREATE TABLE modules
    // (id, courseId, name, description, order, status,
    // createdAt, updatedAt)
    //
    // CREATE TABLE lessons
    // (id, moduleId, name, description, content, order,
    // status, createdAt, updatedAt)
  },

  async down(): Promise<void> {
    // Production:
    // DROP TABLE lessons
    // DROP TABLE modules
  },
};
