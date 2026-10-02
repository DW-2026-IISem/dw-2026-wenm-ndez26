import { AppError } from "../../../shared/errors/app-error";
import { LearnerRepository } from "./learner.repository";
import {
  CreateLearnerDto,
  LearnerResponseDto,
  PatchLearnerDto,
  toLearnerResponseDto,
  UpdateLearnerDto,
} from "./dto";

export class LearnerService {
  constructor(
    private readonly learnerRepository: LearnerRepository
  ) {}

  async getAll(): Promise<LearnerResponseDto[]> {
    const learners = await this.learnerRepository.findAllActive();

    return learners.map(toLearnerResponseDto);
  }

  async getOne(id: number): Promise<LearnerResponseDto> {
    const learner = await this.findOrFail(id);

    return toLearnerResponseDto(learner);
  }

  async create(
    dto: CreateLearnerDto
  ): Promise<LearnerResponseDto> {
    const learner = await this.learnerRepository.create({
      name: dto.name,
      description: dto.description,
      password: dto.password,
      status: dto.status ?? "active",
    });

    return toLearnerResponseDto(learner);
  }

  async updatePut(
    id: number,
    dto: UpdateLearnerDto
  ): Promise<LearnerResponseDto> {
    await this.findOrFail(id);

    const learner = await this.learnerRepository.update(id, {
      name: dto.name,
      description: dto.description,
      password: dto.password,
    });

    if (!learner) {
      throw new AppError(404, "Learner not found");
    }

    return toLearnerResponseDto(learner);
  }

  async updatePatch(
    id: number,
    dto: PatchLearnerDto
  ): Promise<LearnerResponseDto> {
    await this.findOrFail(id);

    const learner = await this.learnerRepository.update(id, {
      ...dto,
    });

    if (!learner) {
      throw new AppError(404, "Learner not found");
    }

    return toLearnerResponseDto(learner);
  }

  async deletePhysical(id: number): Promise<void> {
    await this.findOrFail(id, false);

    await this.learnerRepository.delete(id);
  }

  async deleteLogical(id: number): Promise<LearnerResponseDto> {
    const learner = await this.findOrFail(id);

    const updated = await this.learnerRepository.update(id, {
      status: "inactive",
    });

    if (!updated) {
      throw new AppError(404, "Learner not found");
    }

    return toLearnerResponseDto(updated);
  }

private async findOrFail(
  id: number,
  onlyActive = true
) {
  const learner = await this.learnerRepository.findById(
    id,
    undefined,
    onlyActive
  );

  if (!learner) {
    const message = onlyActive
      ? "Learner not found or inactive"
      : "Learner not found";

    throw new AppError(404, message);
  }

  return learner;
}
}
