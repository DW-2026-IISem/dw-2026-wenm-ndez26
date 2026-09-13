import { Inject, Injectable } from '@nestjs/common';

import { TeacherNotFoundException } from '../../domain/exceptions/teacher-not-found.exception.js';

import { TEACHER_REPOSITORY } from '../../domain/interfaces/teacher-repository.interface.js';
import type { ITeacherRepository } from '../../domain/interfaces/teacher-repository.interface.js';

@Injectable()
export class DeleteTeacherUseCase {
  constructor(
    @Inject(TEACHER_REPOSITORY)
    private readonly teacherRepository: ITeacherRepository,
  ) {}

  async execute(id: number): Promise<void> {
    const teacher = await this.teacherRepository.findById(id);

    if (!teacher) {
      throw new TeacherNotFoundException(id);
    }

    await this.teacherRepository.delete(id);
  }
}
