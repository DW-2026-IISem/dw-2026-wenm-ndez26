import { TeacherEntity } from '../../domain/entities/teacher.entity.js';
import { TeacherResponseDto } from '../dto/teacher-response.dto.js';

export class TeacherMapper {
  static toResponse(teacher: TeacherEntity): TeacherResponseDto {
    return {
      id: teacher.getId()!,
      name: teacher.getName(),
      description: teacher.getDescription(),
      isActive: teacher.getIsActive(),
      createdAt: teacher.getCreatedAt()!,
      updatedAt: teacher.getUpdatedAt()!,
    };
  }

  static toEntity(data: {
    name: string;
    description?: string;
    isActive?: import('../../../../../common/enums/status.enum.js').Status;
  }): TeacherEntity {
    return new TeacherEntity({
      name: data.name,
      description: data.description,
      isActive: data.isActive,
    });
  }
}
