import { useTimeout } from "@vueuse/core";

import {
  ref,
  watch,
  unref,
  onMounted,
  inject,
  provide,
  computed,
  type Ref,
} from "vue";

import {
  isHtmlElement,
  findEdgeElement,
  findEdgeElementFromQuery,
  findRelativeElement,
  findRelativeElementFromQuery,
  isPrintableCharacter,
  isRepeatingCharacter,
  withModifierKey,
} from "./utils";

export type UseKeyboardListOptions = {
  /**
   * If you provide a key, the keyboard list
   * will see if there's a usage further up
   * with the same key, and then
   * reuse that instance.
   *
   * This will also effect how it searches
   * for items, as it will no longer only look
   * through direct children, but do a full search,
   * so please provide a `selector` when using.
   */
  key?: Symbol;

  /**
   * When a `key` is set, we sometimes do
   * heavier searches with `querySelectorAll`,
   * so it is recommended to provide a selector
   * to limit the items to search for.
   *
   * Does literally nothing if `key` is not set.
   *
   * @default "*"
   */
  selector?: string;

  /**
   * The orientation of the list. This is used to
   * determine which arrow keys should be used to
   * navigate the list.
   *
   * @default "vertical"
   */
  orientation?: "horizontal" | "vertical";

  /**
   * If the list should go back to the first
   * item when on the last item, and vise-versa.
   *
   * If false, the list will stop at an item
   * when there are no more items in the direction
   * of the arrow key.
   *
   * @default false
   */
  loop?: boolean;

  /**
   * If the list should support type ahead.
   *
   * @default true
   */
  typeAhead?: boolean;

  /**
   * If the active element should be focused using
   * `element.focus()` or if the element should just
   * get an attribute for `data-focus="true"` instead.
   *
   * If you wish to make more changes to the active
   * element you can use a watcher on the exposed `activeItem`.
   *
   * ```ts
   * watch(activeItem, (newActiveItem, oldActiveItem) => {
   *  oldActiveItem?.removeAttribute("active");
   *  newActiveItem?.setAttribute("active", "true");
   * });
   * ```
   *
   * @default false
   */
  focus?: boolean;

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
    event: KeyboardEvent
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
    event: KeyboardEvent
  ) => void | Promise<void>;

  /**
   * Runs when `Escape` is pressed.
   */
  onEscape?: (
    element: HTMLElement | undefined,
    navigate: NavigateFunction,
    event: KeyboardEvent
  ) => void | Promise<void>;

  /**
   * Runs when `Tab` is pressed.
   *
   * The default behavior of `Tab` runs,
   * as there is no `event.preventDefault()`
   * before this callback.
   */
  onTab?: (
    element: HTMLElement | undefined,
    navigate: NavigateFunction,
    event: KeyboardEvent
  ) => void | Promise<void>;

  /**
   * Runs when no action is triggered.
   */
  onUnknownKey?: (
    element: HTMLElement | undefined,
    navigate: NavigateFunction,
    event: KeyboardEvent
  ) => any | Promise<any>;

  /**
   * Runs when the list has reached the edge,
   * and an arrow key is pressed, but loop
   * is set to `false`.
   */
  onNoEdge?: (
    direction: "next" | "previous",
    navigate: NavigateFunction
  ) => void;

  /**
   * Filter items to include in keyboard navigation.
   * Returning `false` will exclude the element.
   */
  filter?: (element: HTMLElement) => boolean;
};

export interface UseKeyboardList {
  /**
   * The currently focused element.
   */
  activeItem: Ref<HTMLElement | undefined>;

  /**
   * Helper function to change
   * active item relatively.
   */
  navigate: NavigateFunction;

  /**
   * Force focus the active item.
   */
  refocus: () => Promise<void>;

  /**
   * Force click the active item.
   */
  click: () => void;

  /**
   * Manually activate typeahead.
   */
  type: (key: string) => void;

  /**
   * The `@keydown` listener to attach to the list.
   */
  onKeyDown: (event: KeyboardEvent) => void;

  /**
   * The `@focusin` listener to attach to the list.
   */
  onFocusIn: (event: FocusEvent) => void;

  /**
   * The `@pointerenter` listener to attach to every
   * focusable item inside the list, if you want
   * keyboard navigation and hover to be in sync.
   */
  onItemPointerEnter: (event: PointerEvent) => void;
}

export type NavigateFunction = (
  to?: "next" | "previous" | "first" | "last" | HTMLElement
) => Promise<void>;

/* prettier-ignore */
type KeyMapper = Record<string, (
  element: HTMLElement | undefined,
  navigate: NavigateFunction,
  event: KeyboardEvent
) => void>;

/**
 * @TODO Add support for `PageUp` and `PageDown` keys.
 */
/* eslint-disable-next-line complexity */
export const useKeyboardList = (
  list: Ref<HTMLElement | undefined | null> | HTMLElement | undefined | null,
  options: UseKeyboardListOptions = {}
): UseKeyboardList => {
  const {
    selector = "*",
    orientation = "vertical",
    loop = false,
    typeAhead = true,
    focus = true,

    onBackArrow,
    onForwardArrow,
    onEscape,
    onTab,
    onUnknownKey,
  } = options;

  const parent = options.key
    ? inject<UseKeyboardList | undefined>(options.key, undefined)
    : undefined;

  const currentActiveItem = ref<HTMLElement | undefined>();

  const activeItem = computed({
    get() {
      return parent ? parent.activeItem.value : currentActiveItem.value;
    },

    set(value) {
      if (parent) {
        parent.activeItem.value = value;
      } else {
        currentActiveItem.value = value;
      }
    },
  });

  const search = ref("");

  const repeatingSearchTimeout = useTimeout(500, {
    controls: true,
    callback() {
      if (typeAhead) {
        search.value = "";
      }
    },
  });

  watch(currentActiveItem, () => refocus());

  const findRelativeElementInList = (by: "next" | "previous") => {
    if (options.key) {
      return findRelativeElementFromQuery(
        by,
        selector,
        unref(list),
        activeItem.value,
        options.filter
      );
    }

    return findRelativeElement(by, activeItem.value, options.filter);
  };

  const findEdgeElementInList = (by: "first" | "last") => {
    if (options.key) {
      return findEdgeElementFromQuery(
        by,
        selector,
        unref(list),
        options.filter
      );
    }

    return findEdgeElement(by, unref(list), options.filter);
  };

  const next = () => {
    const nextItem = findRelativeElementInList("next");

    if (isHtmlElement(nextItem)) {
      activeItem.value = nextItem;
    } else if (loop) {
      first();
    } else {
      options.onNoEdge?.("next", navigate);
    }
  };

  const previous = () => {
    const prevItem = findRelativeElementInList("previous");

    if (isHtmlElement(prevItem)) {
      activeItem.value = prevItem;
    } else if (loop) {
      last();
    } else {
      options.onNoEdge?.("previous", navigate);
    }
  };

  const first = () => {
    const firstItem = findEdgeElementInList("first");

    if (isHtmlElement(firstItem)) {
      activeItem.value = firstItem;
    }
  };

  const last = () => {
    const lastItem = findEdgeElementInList("last");

    if (isHtmlElement(lastItem)) {
      activeItem.value = lastItem;
    }
  };

  const refocus = async () => {
    return new Promise<void>(resolve => {
      setTimeout(() => {
        if (focus) {
          activeItem.value?.focus();
        } else {
          const lastActiveItem = activeItem.value;

          activeItem.value = undefined;
          activeItem.value = lastActiveItem;
        }

        resolve();
      }, 0);
    });
  };

  const navigate: NavigateFunction = async to => {
    switch (to) {
      case "next":
        next();
        break;

      case "previous":
        previous();
        break;

      case "first":
        first();
        break;

      case "last":
        last();
        break;

      default:
        activeItem.value = to;
    }

    return refocus();
  };

  const click = () => {
    activeItem.value?.click();
  };

  const type = (key: string) => {
    if (repeatingSearchTimeout.isPending.value) {
      repeatingSearchTimeout.stop();
    }

    const character = key.toLowerCase();

    search.value += character;

    const isRepeating = isRepeatingCharacter(search.value, character);

    const items = options.key
      ? unref(list)?.querySelectorAll(selector) ?? []
      : unref(list)?.children ?? [];

    const matches = Array.from(items)
      .filter((element): element is HTMLElement => isHtmlElement(element))
      .filter(element => {
        const text = element.textContent?.trim().toLowerCase();

        if (isRepeating) {
          return text?.startsWith(character);
        }

        return text?.startsWith(search.value);
      });

    const currentIndex = matches.findIndex(element =>
      activeItem.value?.isSameNode(element)
    );

    const next = matches[currentIndex + 1];

    if (next) {
      activeItem.value = next;
    } else {
      /* eslint-disable-next-line prefer-destructuring */
      activeItem.value = matches[0];
    }

    repeatingSearchTimeout.start();
  };

  const Keys: KeyMapper = {
    [orientation === "vertical" ? "ArrowDown" : "ArrowRight"]: next,
    [orientation === "vertical" ? "ArrowUp" : "ArrowLeft"]: previous,

    Enter: click,
    " ": click,

    Home: first,
    End: last,

    ...(onBackArrow && {
      [orientation === "vertical" ? "ArrowLeft" : "ArrowUp"]: onBackArrow,
    }),

    ...(onForwardArrow && {
      [orientation === "vertical" ? "ArrowRight" : "ArrowDown"]: onForwardArrow,
    }),

    ...(onEscape && {
      Escape: onEscape,
    }),

    ...(onTab && {
      Tab: onTab,
    }),
  };

  onMounted(() => {
    const currentList = unref(list);

    if (!currentList || !focus) {
      return;
    }
  });

  const result: UseKeyboardList = {
    activeItem,

    navigate,
    refocus,
    click,
    type,

    onKeyDown(event: KeyboardEvent) {
      if (!withModifierKey(event) || (event.shiftKey && event.key === "Tab")) {
        event.stopPropagation();

        const action = Keys[event.key];

        if (action) {
          if (event.key !== "Tab") {
            event.preventDefault();
          }

          return action(activeItem.value, navigate, event);
        }

        if (typeAhead && isPrintableCharacter(event.key)) {
          return type(event.key);
        }
      }

      onUnknownKey?.(activeItem.value, navigate, event);
    },

    onFocusIn(event: FocusEvent) {
      const currentList = unref(list);

      if (!currentList || !focus) {
        return;
      }

      if (!isHtmlElement(event.target)) {
        return;
      }

      if (event.target.parentElement?.isEqualNode(currentList)) {
        activeItem.value = event.target;
      }
    },

    onItemPointerEnter(event: PointerEvent) {
      const currentList = unref(list);

      if (!currentList || !isHtmlElement(event.target)) {
        return;
      }

      if (event.target.parentElement?.isEqualNode(currentList)) {
        activeItem.value = event.target;
      }
    },
  };

  if (options.key) {
    provide(options.key, result);
  }

  return result;
};
