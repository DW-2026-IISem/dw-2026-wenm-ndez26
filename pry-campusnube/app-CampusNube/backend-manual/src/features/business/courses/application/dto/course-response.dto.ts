import {
  ApiProperty,
  ApiPropertyOptional,
} from '@nestjs/swagger';

import { Status } from '../../../../common/enums/status.enum.js';

export class CourseResponseDto {
  @ApiProperty({ example: 1 })
  id: number;

  @ApiProperty({ example: 'Introducción al Desarrollo Web' })
  name: string;

  @ApiPropertyOptional({
    example: 'Fundamentos para crear aplicaciones web modernas.',
  })
  description?: string;

  @ApiProperty({
    enum: Status,
    example: Status.ACTIVE,
  })
  status: Status;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}
