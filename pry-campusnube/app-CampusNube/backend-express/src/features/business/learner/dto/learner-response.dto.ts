
import { Learner } from "../learner.model";

export type LearnerResponseDto = {
  id: number;
  name: string;
  description: string;
  status: "active" | "inactive";
  createdAt?: Date;
  updatedAt?: Date;
};

export const toLearnerResponseDto = (
  learner: Learner
): LearnerResponseDto => {
  const data = learner.get({ plain: true });

  return {
    id: data.id,
    name: data.name,
    description: data.description,
    status: data.status,
    createdAt: data.createdAt,
    updatedAt: data.updatedAt,
  };
};
