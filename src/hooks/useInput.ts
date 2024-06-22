import {
  computed,
  provide,
  readonly,
  ref,
  type DeepReadonly,
  type InjectionKey,
  type Ref,
} from "vue";

import { useThrottleFn, watchImmediate } from "@vueuse/core";

import { isHtmlElement } from "./useKeyboardList";

export interface InputContext {
  id: DeepReadonly<Ref<string>>;

  addError(id: string): void;

  removeError(id: string): void;

  addDescription(id: string): void;

  removeDescription(id: string): void;
}

export const InputContextKey: InjectionKey<InputContext> =
  Symbol("peachy-input");

export interface UseInputOptions<T> {
  isSame(oldValue: T | undefined, newValue: T): boolean;
}

export const useInput = <T>(
  id: Ref<string>,
  value: Ref<T>,
  emit: ((evt: "validate", value: T) => void) &
    ((evt: "clear-validation") => void),
  options: UseInputOptions<T>
) => {
  const initialValue = value.value;

  const descriptionIds = ref<string[]>([]);

  const errorIds = ref<string[]>([]);

  watchImmediate(errorIds, newErrorIds => {
    const inputElement = document.getElementById(id.value);

    if (isHtmlElement(inputElement)) {
      const describeBy = [...newErrorIds, ...descriptionIds.value].join(", ");

      const hasErrors = !!newErrorIds.length;

      inputElement.setAttribute("aria-describeby", describeBy);
      inputElement.setAttribute("aria-invalid", `${!!hasErrors}`);
    }
  });

  provide(InputContextKey, {
    id: readonly(id),

    addError(id) {
      errorIds.value = [...errorIds.value, id];
    },

    removeError(id) {
      errorIds.value = errorIds.value.filter(_id => _id !== id);
    },

    addDescription(id: string) {
      descriptionIds.value = [...descriptionIds.value, id];
    },

    removeDescription(id: string) {
      descriptionIds.value = descriptionIds.value.filter(_id => _id !== id);
    },
  });

  return {
    initialValue,

    hasErrors: computed(() => !!errorIds.value.length),

    validate() {
      emit("clear-validation");
      emit("validate", value.value);
    },

    validateWithValue(valueToValidate: T) {
      emit("clear-validation");
      emit("validate", valueToValidate);
    },

    reset() {
      value.value = initialValue;
      emit("clear-validation");
    },

    clearErrors: useThrottleFn(() => {
      emit("clear-validation");
    }, 250),

    changed: computed(() => {
      return !options.isSame(initialValue, value.value);
    }),
  };
};
