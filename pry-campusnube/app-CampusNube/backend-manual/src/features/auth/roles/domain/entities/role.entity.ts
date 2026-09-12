import { Status } from '../../../../../common/enums/status.enum.js';

export class Role {
  id?: number;
  name: string;
  isActive: Status;
  createdAt?: Date;
  updatedAt?: Date;

  constructor(partial: Partial<Role>) {
    Object.assign(this, partial);
  }
}
