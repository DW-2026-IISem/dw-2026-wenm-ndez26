import { createRequire } from 'node:module';

import {
  BelongsTo,
  Column,
  CreatedAt,
  DataType,
  ForeignKey,
  Model,
  PrimaryKey,
  AutoIncrement,
  Table,
  UpdatedAt,
} from 'sequelize-typescript';

import { Status } from '../../../../../../common/enums/status.enum.js';

const require = createRequire(import.meta.url);

@Table({ tableName: 'lessons' })
export class LessonModel extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)
  declare id: number;

  @ForeignKey(
    () =>
      require('./module.model.js').ModuleModel,
  )
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  declare moduleId: number;

  @BelongsTo(
    () =>
      require('./module.model.js').ModuleModel,
  )
  declare module: unknown;

  @Column({
    type: DataType.STRING(150),
    allowNull: false,
  })
  declare name: string;

  @Column({
    type: DataType.TEXT,
    allowNull: true,
  })
  declare description: string | null;

  @Column({
    type: DataType.TEXT,
    allowNull: true,
  })
  declare content: string | null;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    defaultValue: 1,
  })
  declare order: number;

  @Column({
    type: DataType.ENUM(...Object.values(Status)),
    allowNull: false,
    defaultValue: Status.ACTIVE,
  })
  declare status: Status;

  @CreatedAt
  declare createdAt: Date;

  @UpdatedAt
  declare updatedAt: Date;
}
