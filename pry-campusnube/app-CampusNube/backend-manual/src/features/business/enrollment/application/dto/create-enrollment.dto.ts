import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsPositive } from 'class-validator';

export class CreateEnrollmentDto {
  @ApiProperty({ example: 1 })
  @IsInt()
  @IsPositive()
  apprenticeId: number;

  @ApiProperty({ example: 1 })
  @IsInt()
  @IsPositive()
  courseId: number;
}
