import type { InjectionKey } from "vue";

export interface ProgressContext {
  setLabelId(id: string): void;
}

export const ProgressContextKey: InjectionKey<ProgressContext> =
  Symbol("peachy-progress");
