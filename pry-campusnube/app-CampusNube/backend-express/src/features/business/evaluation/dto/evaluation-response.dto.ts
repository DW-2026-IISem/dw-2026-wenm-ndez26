import { EvaluationI } from "../evaluation.model";

export type EvaluationResponseDto = EvaluationI;

export const toEvaluationResponseDto = (
  evaluation: EvaluationI
): EvaluationResponseDto => {
  return evaluation;
};
