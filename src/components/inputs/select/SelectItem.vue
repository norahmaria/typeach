<template>
  <!-- eslint-disable-next-line vuejs-accessibility/interactive-supports-focus vuejs-accessibility/click-events-have-key-events -->
  <div
    ref="item"
    :id="id"
    :class="itemClass()"
    :data-active="unref(select?.activeDescendantId) === id"
    :data-readonly="unref(select?.readonly)"
    :aria-selected="selected"
    :aria-disabled="disabled || unref(select?.readonly)"
    :tabindex="0"
    role="option"
    @pointerenter="select?.listBox.onItemPointerEnter"
    @click="onClick">
    <slot :selected="selected" />
  </div>
</template>

<script lang="ts" setup>
  import {
    computed,
    inject,
    nextTick,
    onMounted,
    provide,
    ref,
    toRef,
    unref,
  } from "vue";

  import { usePeachyClasses } from "@/hooks";

  import { SelectContextKey, SelectItemContextKey } from "./context";

  export interface SelectItemProps {
    id: string;
    disabled?: boolean;
  }

  const props = withDefaults(defineProps<SelectItemProps>(), {
    disabled: false,
  });

  const { itemClass } = usePeachyClasses("select", ["item"]);

  const idRef = toRef(props, "id");

  const select = inject(SelectContextKey);

  const item = ref<HTMLDivElement>();

  const selected = computed(() => {
    return select?.selectedIds.value.includes(idRef.value) ?? false;
  });

  onMounted(async () => {
    if (!select) {
      return;
    }

    await nextTick();

    if (select.selectedIds.value.includes(props.id)) {
      if (!select.listBox.activeItem.value) {
        select.listBox.activeItem.value = item.value;
      }
    }
  });

  const onClick = (event: MouseEvent) => {
    if (props.disabled || unref(select?.readonly)) {
      return;
    }

    select?.listBox.onItemClick(event);

    if (!unref(select?.multiSelect)) {
      select?.popover?.value?.hide();
    }
  };

  provide(SelectItemContextKey, {
    selected,
  });
</script>
