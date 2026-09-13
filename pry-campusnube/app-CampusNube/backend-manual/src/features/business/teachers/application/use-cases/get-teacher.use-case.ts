import { Inject, Injectable } from '@nestjs/common';

import { TeacherNotFoundException } from '../../domain/exceptions/teacher-not-found.exception.js';

import {
  ITeacherRepository,
  TEACHER_REPOSITORY,
} from '../../domain/interfaces/teacher-repository.interface.js';

import { TeacherResponseDto } from '../dto/teacher-response.dto.js';
import { TeacherMapper } from '../mappers/teacher.mapper.js';

@Injectable()
export class GetTeacherUseCase {
  constructor(
    @Inject(TEACHER_REPOSITORY)
    private readonly teacherRepository: ITeacherRepository,
  ) {}

  async execute(id: number): Promise<TeacherResponseDto> {
    const teacher = await this.teacherRepository.findById(id);

    if (!teacher) {
      throw new TeacherNotFoundException(id);
    }

    return TeacherMapper.toResponse(teacher);
  }
}
