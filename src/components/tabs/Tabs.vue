<template>
  <!-- eslint-disable-next-line vuejs-accessibility/no-static-element-interactions -->
  <div
    ref="container"
    :class="tabsClass()"
    @mouseenter="onMouseEnter"
    @mouseleave="onMouseLeave"
    @focusin="onFocusIn"
    @focusout="onFocusOut">
    <slot />
  </div>
</template>

<script lang="ts" setup>
  import { provide, readonly, ref, toRef, watch } from "vue";
  import { useInterval } from "@vueuse/core";

  import { usePeachyClasses } from "../../hooks";

  import { TabsContextKey } from "./context";

  export interface TabsProps {
    /**
     * The current tab to be displayed.
     */
    tab: string;

    /**
     * If a tab should automatically open when it's
     * <Tabs.ListItem /> gains focus.
     *
     * @default false
     */
    followFocus?: boolean;

    /**
     * If the tabs should loop automatically
     * acting as a carousel, this value is the
     * time for each tab to be displayed in milliseconds.
     *
     * If set to undefined or 0, it will not loop automatically.
     *
     * @default 0
     */
    interval?: number;
  }

  const props = withDefaults(defineProps<TabsProps>(), {
    followFocus: false,
    interval: 0,
  });

  const emit = defineEmits<{
    "update:tab": [tabId: string];
  }>();

  const { tabsClass } = usePeachyClasses("tabs");

  const intervalRef = toRef(props, "interval");

  const tabs = ref<string[]>([]);

  const container = ref<HTMLDivElement>();

  const currentTab = ref(props.tab);

  const titleId = ref<string>();

  watch(currentTab, newTab => {
    emit("update:tab", newTab);
  });

  /* prettier-ignore */
  watch(() => props.tab, newTab => {
    currentTab.value = newTab;
  });

  const int = toRef(props, "interval");

  const { reset, pause, resume } = useInterval(int, {
    controls: true,
    immediate: false,

    callback() {
      navigate("next");
    },
  });

  const isHovering = ref(false);

  const isFocusing = ref(false);

  const onMouseEnter = () => {
    pause();
    isHovering.value = true;
  };

  const onMouseLeave = () => {
    if (!isFocusing.value) {
      resume();
    }

    isHovering.value = false;
  };

  const onFocusIn = () => {
    pause();
    isFocusing.value = true;
  };

  const onFocusOut = () => {
    if (!isHovering.value) {
      resume();
    }
    isFocusing.value = false;
  };

  const navigate = (to: "previous" | "next") => {
    const index = tabs.value.indexOf(currentTab.value);

    if (to === "next") {
      const [firstTab] = tabs.value;

      const nextTab = tabs.value[index + 1];

      if (nextTab) {
        currentTab.value = nextTab;
      } else if (firstTab) {
        currentTab.value = firstTab;
      }
    } else {
      const lastTab = tabs.value[tabs.value.length - 1];

      const prevTab = tabs.value[index - 1];

      if (prevTab) {
        currentTab.value = prevTab;
      } else if (lastTab) {
        currentTab.value = lastTab;
      }
    }
  };

  /* prettier-ignore */
  watch(intervalRef, newInterval => {
    if (newInterval) {
      resume();
    } else {
      pause();
      reset();
    }
  }, { immediate: true });

  provide(TabsContextKey, {
    tabs,
    currentTab,
    navigate,

    followFocus: toRef(props, "followFocus"),

    titleId: readonly(titleId),

    setTitleId(id) {
      titleId.value = id;
    },

    addTab(tab) {
      tabs.value.push(tab);
    },

    pause() {
      if (int.value) {
        pause();
      }
    },

    resume() {
      if (int.value) {
        resume();
      }
    },
  });
</script>
