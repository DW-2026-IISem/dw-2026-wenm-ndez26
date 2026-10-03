import { AppError } from "../../../shared/errors/app-error";
import { Module } from "../module/module.model";
import { Lesson } from "./lesson.model";
import { LessonRepository } from "./lesson.repository";
import {
  CreateLessonDto,
  LessonResponseDto,
  PatchLessonDto,
  UpdateLessonDto,
  toLessonResponseDto,
} from "./dto";

export class LessonService {
  private readonly repository = new LessonRepository();

  async getAll(): Promise<LessonResponseDto[]> {
    const lessons = await this.repository.findAll();

    return lessons.map(toLessonResponseDto);
  }

  async findOrFail(id: number): Promise<Lesson> {
    const lesson = await this.repository.findById(id);

    if (!lesson) {
      throw new AppError(404, "Lección no encontrada");
    }

    return lesson;
  }

  private async validateActiveModule(moduleId: number): Promise<void> {
    const module = await Module.findOne({
      where: {
        id: moduleId,
        isActive: true,
      },
    });

    if (!module) {
      throw new AppError(
        400,
        "El módulo no existe o no está activo"
      );
    }
  }

  async getOne(id: number): Promise<LessonResponseDto> {
    const lesson = await this.findOrFail(id);

    return toLessonResponseDto(lesson);
  }

  async create(
    data: CreateLessonDto
  ): Promise<LessonResponseDto> {
    await this.validateActiveModule(data.module_id);

    const lesson = await this.repository.create(data);

    return toLessonResponseDto(lesson);
  }

  async update(
    id: number,
    data: UpdateLessonDto
  ): Promise<LessonResponseDto> {
    const lesson = await this.findOrFail(id);

    await this.validateActiveModule(data.module_id);

    const updatedLesson = await this.repository.update(
      lesson,
      data
    );

    return toLessonResponseDto(updatedLesson);
  }

  async patch(
    id: number,
    data: PatchLessonDto
  ): Promise<LessonResponseDto> {
    const lesson = await this.findOrFail(id);

    if (data.module_id !== undefined) {
      await this.validateActiveModule(data.module_id);
    }

    const updatedLesson = await this.repository.patch(
      lesson,
      data
    );

    return toLessonResponseDto(updatedLesson);
  }

  async delete(id: number): Promise<void> {
    const lesson = await this.findOrFail(id);

    await this.repository.delete(lesson);
  }

  async deactivate(
    id: number
  ): Promise<LessonResponseDto> {
    const lesson = await this.findOrFail(id);

    const deactivatedLesson =
      await this.repository.deactivate(lesson);

    return toLessonResponseDto(deactivatedLesson);
  }
}