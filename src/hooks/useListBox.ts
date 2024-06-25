import { ref, unref, type Ref } from "vue";

import {
  useKeyboardList,
  isHtmlElement,
  findEdgeElement,
  type UseKeyboardListOptions,
  type UseKeyboardList,
  type NavigateFunction,
} from "./useKeyboardList";

export type UpdateItemFunction = (
  id: string,
  action: "select" | "deselect"
) => void;

type PartialKeyboardListOptions = Omit<
  UseKeyboardListOptions,
  | "loop"
  | "focus"
  | "onBackArrow"
  | "onForwardArrow"
  | "onEscape"
  | "onTab"
  | "onUnknownKey"
  | "onNoEdge"
>;

export interface UseListBoxOptions extends PartialKeyboardListOptions {
  /**
   * When list is set to vertical orientation, this
   * runs when the `ArrowLeft` key is
   * pressed on an item.
   *
   * If set to horizontal, it triggers
   * on `ArrowUp`.
   */
  onBackArrow?: (
    element: HTMLElement | undefined,
    navigate: NavigateFunction,
    event: KeyboardEvent,
    updateItem: UpdateItemFunction
  ) => void | Promise<void>;

  /**
   * When list is set to vertical orientation, this
   * runs when runs when the `ArrowRight` key is
   * pressed on an item.
   *
   * If set to horizontal, it triggers
   * on `ArrowDown`.
   */
  onForwardArrow?: (
    element: HTMLElement | undefined,
    navigate: NavigateFunction,
    event: KeyboardEvent,
    updateItem: UpdateItemFunction
  ) => void | Promise<void>;

  /**
   * Runs when no action is triggered.
   */
  onUnknownKey?: (
    element: HTMLElement | undefined,
    navigate: NavigateFunction,
    event: KeyboardEvent,
    updateItem: UpdateItemFunction
  ) => any | Promise<any>;

  /**
   * Runs when the list has reached the edge,
   * and an arrow key is pressed, but loop
   * is set to `false`.
   */
  onNoEdge?: (
    direction: "next" | "previous",
    navigate: NavigateFunction,
    updateItem: UpdateItemFunction
  ) => void;

  /**
   * Callback for cases where the listbox
   * should lose focus if it's associated
   * with a popup.
   */
  onExit?: (navigate: NavigateFunction, updateItem: UpdateItemFunction) => void;

  /**
   * Filter items that are disabled, to prevent selection,
   * by default it will consider elements with either the `disabled`
   * attribute, or with `aria-disabled` set to true as disabled.
   *
   * Returning `true` will mark the item as disabled.
   */
  disabledFilter?: (element: HTMLElement) => boolean;
}

export interface UseListBox extends UseKeyboardList {
  selectedIds: Ref<string[]>;

  /**
   * Select or deselect an item by it's item.
   */
  updateItem: UpdateItemFunction;

  /**
   * Get the first selected item in the list.
   * Useful for popover cases, where refocus should
   * be on the first selected item.
   */
  getFirstSelectedItem(): HTMLElement | undefined;

  /**
   * The `@keydown` listener to attach to the list.
   */
  onKeyDown: (event: KeyboardEvent) => void;

  /**
   * The `@click` listener to attach to every
   * focusable item inside the list.
   */
  onItemClick: (event: MouseEvent) => void;

  /**
   * The `@pointerenter` listener to attach to every
   * focusable item inside the list, if you want
   * keyboard navigation and hover to be in sync.
   */
  onItemPointerEnter: (event: PointerEvent) => void;
}

const forElementsBetween = (
  parent: HTMLElement,
  options: {
    start: HTMLElement;
    end: HTMLElement;
    callback: (element: HTMLElement) => void;
  }
) => {
  const { start, end, callback } = options;

  const children = Array.from(parent.children);

  const startIsBeforeEnd = children.indexOf(start) < children.indexOf(end);

  let element: HTMLElement | Element | null = startIsBeforeEnd
    ? start.nextElementSibling
    : end.nextElementSibling;

  if (startIsBeforeEnd) {
    callback(start);
  } else {
    callback(end);
  }

  while (element && !element.isSameNode(startIsBeforeEnd ? end : start)) {
    if (!isHtmlElement(element)) {
      break;
    }

    callback(element);
    element = element.nextElementSibling;
  }

  if (startIsBeforeEnd) {
    callback(end);
  } else {
    callback(start);
  }
};

export const useListBox = (
  list: Ref<HTMLElement | undefined | null> | HTMLElement | undefined | null,
  multiSelect: Ref<boolean> | boolean,
  readonly: Ref<boolean> | boolean,
  options: UseListBoxOptions = {}
): UseListBox => {
  const {
    disabledFilter = element =>
      element.hasAttribute("disabled") ||
      element.getAttribute("aria-disabled") === "true",
  } = options;

  const keyboardList = useKeyboardList(list, {
    ...options,

    onBackArrow(element, navigate, event) {
      options.onBackArrow?.(element, navigate, event, updateItem);
    },

    onForwardArrow(element, navigate, event) {
      options.onForwardArrow?.(element, navigate, event, updateItem);
    },

    onEscape(element, navigate, event) {
      options.onExit?.(navigate, updateItem);
    },

    onTab(element, navigate, event) {
      const id = element?.getAttribute("id");

      if (id && !unref(multiSelect)) {
        updateItem(id, "select");
      }

      options.onExit?.(navigate, updateItem);
    },

    /* eslint-disable-next-line complexity */
    onUnknownKey(element, navigate, event) {
      const withModifierKey = event.altKey || event.shiftKey;

      if (event.key !== "ArrowUp" || !withModifierKey) {
        return options.onUnknownKey?.(element, navigate, event, updateItem);
      }

      const id = element?.getAttribute("id");

      if (!id) {
        return;
      }

      if (!unref(multiSelect) && event.altKey) {
        // hide menu???
        options.onExit?.(navigate, updateItem);
        return updateItem(id, "select");
      }

      if (unref(multiSelect) && event.shiftKey) {
        const update = selectedIds.value.includes(id) ? "deselect" : "select";

        updateItem(id, update);
      }
    },

    onNoEdge(direction, navigate) {
      options.onNoEdge?.(direction, navigate, updateItem);
    },
  });

  const selectedIds = ref<string[]>([]);

  const getActiveItemId = () => {
    return keyboardList.activeItem.value?.getAttribute("id");
  };

  const toggleSelectAll = () => {
    if (unref(readonly)) {
      return;
    }

    const children = Array.from(unref(list)?.children ?? []);

    const selectableItems = children.filter(child => {
      if (!isHtmlElement(child)) {
        return false;
      }

      if (!options.disabledFilter) {
        return true;
      }

      return !disabledFilter(child);
    });

    const newSelectedIds = selectableItems
      .map(item => item.getAttribute("id"))
      .filter((id): id is string => !!id);

    if (selectedIds.value.length === newSelectedIds.length) {
      selectedIds.value = [];
    } else {
      selectedIds.value = newSelectedIds;
    }
  };

  const selectToEdge = (to: "first" | "last") => {
    if (unref(readonly)) {
      return;
    }

    const currentList = unref(list);

    if (!currentList) {
      return;
    }

    const startElement = findEdgeElement(to, currentList);

    if (!startElement || !keyboardList.activeItem.value) {
      return;
    }

    forElementsBetween(currentList, {
      start: startElement,
      end: keyboardList.activeItem.value,

      callback(element) {
        const id = element.getAttribute("id");

        if (id) {
          updateItem(id, "select");
        }
      },
    });
  };

  const getLastSelectedItem = () => {
    const currentList = unref(list);

    if (!currentList) {
      return;
    }

    const lastSelectedId = selectedIds.value[selectedIds.value.length - 1];

    return currentList.querySelector(`#${lastSelectedId}`);
  };

  /* eslint-disable-next-line complexity */
  const updateItem: UpdateItemFunction = (id, action) => {
    if (unref(readonly)) {
      return;
    }

    const element = document.getElementById(id);

    if (isHtmlElement(element) && disabledFilter(element)) {
      return;
    }

    if (unref(multiSelect)) {
      if (action === "select") {
        if (!selectedIds.value.includes(id)) {
          selectedIds.value = [...selectedIds.value, id];
        }
      } else {
        if (selectedIds.value.includes(id)) {
          selectedIds.value = selectedIds.value.filter(_id => _id !== id);
        }
      }
    } else {
      if (action === "select") {
        if (!selectedIds.value.includes(id)) {
          selectedIds.value = [id];
        }

        options.onExit?.(keyboardList.navigate, updateItem);
      } else {
        if (selectedIds.value.includes(id)) {
          selectedIds.value = [];
        }
      }
    }
  };

  const toggleSelected = (id: string) => {
    if (selectedIds.value.includes(id)) {
      updateItem(id, "deselect");
    } else {
      updateItem(id, "select");
    }
  };

  return {
    ...keyboardList,

    selectedIds,
    updateItem,

    getFirstSelectedItem() {
      const currentList = unref(list);

      if (!currentList) {
        return;
      }

      const children = Array.from(currentList.children);

      const selectedChildren = children
        .filter((child): child is HTMLElement => isHtmlElement(child))
        .filter(child => options.filter?.(child) ?? true)
        .filter(child => child.getAttribute("aria-selected") === "true")
        .sort((a, b) => children.indexOf(a) - children.indexOf(b));

      return selectedChildren[0];
    },

    /* eslint-disable-next-line complexity */
    async onKeyDown(event) {
      if ((!event.shiftKey && !event.ctrlKey) || !unref(multiSelect)) {
        return keyboardList.onKeyDown(event);
      }

      const currentList = unref(list);

      if (!currentList) {
        return;
      }

      if (event.ctrlKey) {
        if (event.shiftKey && event.key === "Home") {
          selectToEdge("first");
        }

        if (event.shiftKey && event.key === "End") {
          selectToEdge("last");
        }

        if (event.key.toUpperCase() === "A") {
          toggleSelectAll();
        }
      }

      if (event.shiftKey) {
        if (event.key === "ArrowDown") {
          await keyboardList.navigate("next");

          const id = getActiveItemId();

          if (id) {
            toggleSelected(id);
          }
        }

        if (event.key === "ArrowUp") {
          await keyboardList.navigate("previous");

          const id = getActiveItemId();

          if (id) {
            toggleSelected(id);
          }
        }

        if (event.key === " ") {
          const lastSelectedItem = getLastSelectedItem();

          const currentItem = keyboardList.activeItem.value;

          if (!currentItem || !isHtmlElement(lastSelectedItem)) {
            return;
          }

          forElementsBetween(currentList, {
            start: lastSelectedItem,
            end: currentItem,

            callback(element) {
              const id = element.getAttribute("id");

              if (!disabledFilter(element) && id) {
                updateItem(id, "select");
              }
            },
          });
        }
      }
    },

    onItemClick(event) {
      event.preventDefault();

      if (!isHtmlElement(event.target)) {
        return;
      }

      const id = event.target.getAttribute("id");

      if (!id) {
        return;
      }

      if (unref(multiSelect)) {
        toggleSelected(id);
      } else {
        updateItem(id, "select");
      }
    },
  };
};
