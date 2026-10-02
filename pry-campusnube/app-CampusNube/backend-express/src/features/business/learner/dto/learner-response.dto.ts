import { LearnerI } from "../learner.model";

export type LearnerResponseDto = Omit<LearnerI, "password">;

export const toLearnerResponseDto = (
  learner: LearnerI
): LearnerResponseDto => {
  const { password, ...response } = learner;

  return response;
};
