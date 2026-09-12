/**
 * Migración de referencia para la tabla modules.
 *
 * La tabla modules ya existe en la base de datos CampusNube
 * y es sincronizada por Sequelize durante el desarrollo.
 */

export const createModulesTableMigration = {
  tableName: 'modules',
  columns: {
    id: 'INTEGER PRIMARY KEY AUTO_INCREMENT',
    courseId: 'INTEGER NOT NULL',
    title: 'VARCHAR(150) NOT NULL',
    description: 'TEXT NULL',
    order: 'INTEGER NOT NULL',
    createdAt: 'DATETIME NOT NULL',
    updatedAt: 'DATETIME NOT NULL',
  },
};
