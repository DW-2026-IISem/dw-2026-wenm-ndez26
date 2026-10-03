import { ModuleI } from "../module.model";

export type ModuleResponseDto = ModuleI;

export const toModuleResponseDto = (
  module: ModuleI
): ModuleResponseDto => {
  return module;
};
