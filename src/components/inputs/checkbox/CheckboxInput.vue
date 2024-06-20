<template>
  <slot name="before" />

  <!-- eslint-disable-next-line vuejs-accessibility/label-has-for -->
  <input
    ref="checkbox"
    v-bind="$attrs"
    :id="id"
    :class="[
      inputClass(),
      parent ? childClass() : undefined,
      children.length ? parentClass() : undefined,
    ]"
    :checked="!!internalState"
    :disabled="disabled || disabledByChildren"
    :aria-disabled="readOnly || readOnlyByChildren"
    :data-readonly="readOnly || readOnlyByChildren"
    :aria-required="required"
    type="checkbox"
    style="appearance: none"
    @click.prevent="onClick" />

  <slot name="after" />
</template>

<script lang="ts" setup>
  import {
    inject,
    ref,
    provide,
    onMounted,
    onUnmounted,
    nextTick,
    computed,
    readonly,
    watch,
    toRef,
  } from "vue";

  import { watchDeep, watchImmediate } from "@vueuse/core";

  import { usePeachyClasses, createRandomId, useInput } from "../../../hooks";

  import {
    CheckboxContextKey,
    CheckboxHierarchyKey,
    type CheckboxParent,
    type CheckboxChild,
    type CheckboxState,
  } from "./context";

  export interface CheckboxProps {
    disabled?: boolean;
    state?: CheckboxState;
    readOnly?: boolean;
    required?: boolean;
    id?: string;
  }

  const props = withDefaults(defineProps<CheckboxProps>(), {
    id: () => createRandomId(),

    required: false,

    /**
     * _A parent will also become disabled if any of it's children are disabled._
     */
    disabled: false,

    /**
     * Should only be used for non-parent checkboxes.
     */
    state: false,

    /**
     * _A parent will also become readonly if any of it's children are readonly/disabled._
     */
    readOnly: false,
  });

  const emit = defineEmits<{
    "update:state": [state: CheckboxState];
    validate: [state: CheckboxState];
    "clear-validation": [];
  }>();

  const { inputClass, childClass, parentClass } = usePeachyClasses("checkbox", [
    "input",
    "child",
    "parent",
  ]);

  const idRef = toRef(props, "id");

  const internalState = ref<CheckboxState>(props.state);

  const input = useInput(toRef(props, "id"), internalState, emit, {
    isSame(oldValue, newValue) {
      return oldValue !== newValue;
    },
  });

  const parent = inject<CheckboxParent | undefined>(
    CheckboxHierarchyKey,
    undefined
  );

  const lastSetByParent = ref(false);

  const resetValue = ref(internalState.value);

  const children = ref<CheckboxChild[]>([]);

  const checkbox = ref<HTMLInputElement>();

  watch(internalState, newState => {
    emit("update:state", newState);
    input.validate();
  });

  watchImmediate(toRef(props, "state"), newState => {
    internalState.value = newState;

    resetValue.value = internalState.value;
    parent?.update(idRef.value, internalState.value, resetValue.value);
    parent?.save();

    lastSetByParent.value = false;
  });

  watchImmediate(internalState, newState => {
    if (!checkbox.value) {
      return;
    }

    if (newState === "indeterminate") {
      checkbox.value.indeterminate = true;
    } else {
      checkbox.value.indeterminate = false;
    }
  });

  watchDeep(children, newChildren => {
    if (newChildren.every(child => child.state === true)) {
      internalState.value = true;
    } else if (newChildren.every(child => !child.state)) {
      internalState.value = false;
    } else {
      internalState.value = "indeterminate";
    }

    resetValue.value = internalState.value;
    parent?.update(idRef.value, internalState.value, resetValue.value);
  });

  onMounted(() => {
    parent?.add({
      id: idRef.value,
      state: internalState.value,
      resetValue: resetValue.value,
      disabled: props.disabled || disabledByChildren.value,
      readOnly: props.readOnly || readOnlyByChildren.value,

      set(newState) {
        if (props.disabled) {
          return;
        }

        if (newState === "reset") {
          internalState.value = resetValue.value;
        } else {
          internalState.value = newState;
        }

        if (internalState.value === "indeterminate") {
          setChildren("reset");
        } else {
          setChildren(internalState.value);
        }

        lastSetByParent.value = true;
      },

      save() {
        resetValue.value = internalState.value;
        parent?.update(idRef.value, internalState.value, resetValue.value);
      },
    });
  });

  onUnmounted(() => parent?.remove(idRef.value));

  const setChildren = (to: CheckboxState | "reset") => {
    children.value.forEach(child => child.set(to));
  };

  const disabledByChildren = computed(() => {
    if (!children.value.length) {
      return false;
    }

    return children.value.filter(child => child.disabled).length > 0;
  });

  const readOnlyByChildren = computed(() => {
    if (!children.value.length) {
      return false;
    }

    return children.value.filter(child => child.readOnly).length > 0;
  });

  const onClick = async (event: MouseEvent) => {
    if (props.disabled || props.readOnly) {
      return;
    }

    if (disabledByChildren.value || readOnlyByChildren.value) {
      return;
    }

    /** @see https://github.com/vuejs/vue/issues/9535 */
    /* eslint-disable-next-line complexity */
    setTimeout(async () => {
      if (lastSetByParent.value) {
        children.value.forEach(child => child.save());
        await nextTick();
      }

      if (!children.value.length) {
        internalState.value = !internalState.value;
      } else {
        if (!internalState.value) {
          if (
            children.value.some(child => child.resetValue) &&
            !children.value.every(child => child.resetValue === true)
          ) {
            internalState.value = "indeterminate";
            setChildren("reset");
          } else {
            internalState.value = true;
            setChildren(true);
          }
        } else if (internalState.value === "indeterminate") {
          internalState.value = true;
          setChildren(true);
        } else {
          internalState.value = false;
          setChildren(false);
        }
      }

      resetValue.value = internalState.value;
      parent?.update(idRef.value, internalState.value, resetValue.value);
      parent?.save();

      lastSetByParent.value = false;
    }, 0);
  };

  provide<CheckboxParent>(CheckboxHierarchyKey, {
    state: internalState,
    children,

    add(child) {
      children.value.push(child);
    },

    remove(id) {
      const index = children.value.findIndex(child => child.id === id);

      if (index >= 0) {
        children.value.splice(index, 1);
      }
    },

    update(id, newState, newResetValue) {
      const index = children.value.findIndex(child => child.id === id);

      if (index >= 0) {
        children.value[index]!.state = newState;
        children.value[index]!.resetValue = newResetValue;
      }
    },

    save() {
      children.value.forEach(child => child.save());
      parent?.save();
    },
  });

  provide(CheckboxContextKey, {
    state: readonly(internalState),
    onClick,
  });
</script>
