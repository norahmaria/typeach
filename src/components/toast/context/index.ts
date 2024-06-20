import type { InjectionKey } from "vue";

export interface ToastContext {
  close(): void;
}

export const ToastContextKey: InjectionKey<ToastContext> =
  Symbol("peachy-toast");
