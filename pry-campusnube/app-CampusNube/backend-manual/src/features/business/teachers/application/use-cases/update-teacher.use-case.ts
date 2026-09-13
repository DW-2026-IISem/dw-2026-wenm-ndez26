import { Inject, Injectable } from '@nestjs/common';

import { TeacherNotFoundException } from '../../domain/exceptions/teacher-not-found.exception.js';

import {
  ITeacherRepository,
  TEACHER_REPOSITORY,
} from '../../domain/interfaces/teacher-repository.interface.js';

import { UpdateTeacherDto } from '../dto/update-teacher.dto.js';
import { TeacherResponseDto } from '../dto/teacher-response.dto.js';
import { TeacherMapper } from '../mappers/teacher.mapper.js';

@Injectable()
export class UpdateTeacherUseCase {
  constructor(
    @Inject(TEACHER_REPOSITORY)
    private readonly teacherRepository: ITeacherRepository,
  ) {}

  async execute(
    id: number,
    dto: UpdateTeacherDto,
  ): Promise<TeacherResponseDto> {
    const teacher = await this.teacherRepository.findById(id);

    if (!teacher) {
      throw new TeacherNotFoundException(id);
    }

    const updated = await this.teacherRepository.update(id, dto);

    return TeacherMapper.toResponse(updated);
  }
}
