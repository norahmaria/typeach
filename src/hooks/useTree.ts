import {
  computed,
  inject,
  provide,
  unref,
  type ComputedRef,
  type InjectionKey,
  type Ref,
} from "vue";

import {
  useSelectionIdArray,
  type UseSelectionIdArray,
} from "./useSelectionIdArray";

import { isHtmlElement, useKeyboardList } from "./useKeyboardList";

export const TreeKeyboardListKey = Symbol("tree");

export const UseTreeKey: InjectionKey<UseTree> = Symbol("tree");

export interface UseTree {
  list: ComputedRef<HTMLElement | undefined | null>;
  openSelection: UseSelectionIdArray;
  activeItem: Ref<HTMLElement | undefined>;
  onItemClick(event: MouseEvent, id: string): boolean;
  onKeyDown(event: KeyboardEvent): void;
  onFocusIn(event: FocusEvent): void;
  onItemPointerEnter(id: string): void;
}

export const useTree = (
  list: Ref<HTMLElement | undefined | null> | HTMLElement | undefined | null
) => {
  const parentTree = inject(UseTreeKey, undefined);

  const openSelection = useSelectionIdArray(true);

  const rootList = computed(() => parentTree?.list.value ?? unref(list));

  const keyboardList = useKeyboardList(rootList, {
    focus: true,
    selector: "[role='treeitem']",
    key: TreeKeyboardListKey,

    filter(element) {
      return element.getAttribute("role") === "treeitem";
    },

    onBackArrow(element, navigate, event) {
      const parent = element?.parentElement;

      if (element?.getAttribute("aria-expanded") === "true") {
        const id = element?.getAttribute("id");

        if (id) {
          openSelection.updateItem(id, "deselect");
        }
      } else if (parent?.parentElement?.hasAttribute("aria-expanded")) {
        navigate(parent.parentElement);
      }
    },

    onForwardArrow(element, navigate, event) {
      if (!element?.hasAttribute("aria-expanded")) {
        return;
      }

      if (element?.getAttribute("aria-expanded") === "true") {
        navigate("next");
      } else if (element?.getAttribute("role") === "treeitem") {
        const id = element?.getAttribute("id");

        if (id) {
          openSelection.updateItem(id, "select");
        }
      }
    },

    onUnknownKey(element, navigate, event) {
      if (!element || element?.getAttribute("role") !== "treeitem") {
        return;
      }

      if (event.key === "*") {
        const siblings = Array.from(element?.parentElement?.children ?? []);

        siblings
          .filter(sibling => sibling.hasAttribute("aria-expanded"))
          .filter(sibling => sibling.hasAttribute("id"))
          .map(sibling => sibling.getAttribute("id")!)
          .forEach(id => openSelection.updateItem(id, "select"));
      }
    },
  });

  const result: UseTree = {
    list: computed(() => {
      return unref(parentTree?.list) ?? unref(list);
    }),

    openSelection,
    activeItem: keyboardList.activeItem,

    onKeyDown: keyboardList.onKeyDown,
    onFocusIn: keyboardList.onFocusIn,

    onItemPointerEnter(id) {
      const item = rootList.value?.querySelector(`#${id}[role='treeitem']`);

      if (isHtmlElement(item)) {
        keyboardList.activeItem.value = item;
      }
    },

    onItemClick(event, id) {
      event.preventDefault();
      event.stopPropagation();

      if (!event.isTrusted) {
        return true;
      }

      openSelection.toggleItem(id);
      return false;
    },
  };

  provide(UseTreeKey, result);

  return result;
};
