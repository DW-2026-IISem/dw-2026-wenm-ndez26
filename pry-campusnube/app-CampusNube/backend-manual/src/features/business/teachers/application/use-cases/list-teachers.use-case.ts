import { Inject, Injectable } from '@nestjs/common';

import {
  ITeacherRepository,
  TEACHER_REPOSITORY,
} from '../../domain/interfaces/teacher-repository.interface.js';

import { TeacherResponseDto } from '../dto/teacher-response.dto.js';
import { TeacherMapper } from '../mappers/teacher.mapper.js';

@Injectable()
export class ListTeachersUseCase {
  constructor(
    @Inject(TEACHER_REPOSITORY)
    private readonly teacherRepository: ITeacherRepository,
  ) {}

  async execute(): Promise<TeacherResponseDto[]> {
    const teachers = await this.teacherRepository.findAll();

    return teachers.map((teacher) =>
      TeacherMapper.toResponse(teacher),
    );
  }
}
