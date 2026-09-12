import { ApiProperty } from '@nestjs/swagger';
import { Status } from '../../../../../common/enums/status.enum.js';

export class EnrollmentResponseDto {
  @ApiProperty({ example: 1 })
  id: number;

  @ApiProperty({ example: 1 })
  apprenticeId: number;

  @ApiProperty({ example: 1 })
  courseId: number;

  @ApiProperty({
    enum: Status,
    example: Status.ACTIVE,
  })
  status: Status;

  @ApiProperty()
  enrolledAt: Date;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}
