import {
  ApiProperty,
  ApiPropertyOptional,
} from '@nestjs/swagger';

import { Status } from '../../../../../common/enums/status.enum.js';

export class TeacherResponseDto {
  @ApiProperty({ example: 1 })
  id: number;

  @ApiProperty({ example: 'Carlos Rodríguez' })
  name: string;

  @ApiPropertyOptional({
    example: 'Docente encargado de cursos virtuales.',
  })
  description?: string;

  @ApiProperty({
    enum: Status,
    example: Status.ACTIVE,
  })
  isActive: Status;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}
