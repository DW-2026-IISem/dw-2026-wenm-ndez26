import { Inject, Injectable } from '@nestjs/common';

import {
  ITeacherRepository,
  TEACHER_REPOSITORY,
} from '../../domain/interfaces/teacher-repository.interface.js';

import { CreateTeacherDto } from '../dto/create-teacher.dto.js';
import { TeacherResponseDto } from '../dto/teacher-response.dto.js';
import { TeacherMapper } from '../mappers/teacher.mapper.js';

@Injectable()
export class CreateTeacherUseCase {
  constructor(
    @Inject(TEACHER_REPOSITORY)
    private readonly teacherRepository: ITeacherRepository,
  ) {}

  async execute(
    dto: CreateTeacherDto,
  ): Promise<TeacherResponseDto> {
    const teacher = TeacherMapper.toEntity(dto);

    const created = await this.teacherRepository.create(teacher);

    return TeacherMapper.toResponse(created);
  }
}
