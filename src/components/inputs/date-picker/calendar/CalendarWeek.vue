<template>
  <tr
    ref="tableRow"
    :class="weekClass()"
    @focusin.stop="keyboardList.onFocusIn"
    @keydown="keyboardList.onKeyDown">
    <slot />
  </tr>
</template>

<script lang="ts" setup>
  import { inject, ref } from "vue";

  import { useKeyboardList, usePeachyClasses } from "@/hooks";

  import { DatePickerCalendarContextKey } from "../context";
  import { dayJs } from "../utils";

  const { weekClass } = usePeachyClasses("datePicker", ["week"]);

  const calendar = inject(DatePickerCalendarContextKey);

  const tableRow = ref<HTMLTableRowElement>();

  const keyboardList = useKeyboardList(tableRow, {
    orientation: "horizontal",
    focus: true,
    typeAhead: false,

    filter(element) {
      return element.tagName.toLowerCase() === "td";
    },

    onForwardArrow(element, navigate, event) {
      if (calendar) {
        event.preventDefault();
        calendar?.setActive(calendar.active.value.add(1, "week"));
      }
    },

    onBackArrow(element, navigate, event) {
      if (calendar) {
        event.preventDefault();
        calendar?.setActive(calendar.active.value.add(-1, "week"));
      }
    },

    onNoEdge(direction) {
      if (calendar) {
        const change = direction === "next" ? 1 : -1;
        calendar?.setActive(calendar.active.value.add(change, "day"));
      }
    },

    onUnknownKey(element, navigate, event) {
      if (!calendar) {
        return;
      }

      if (["PageUp", "PageDown"].includes(event.key)) {
        event.preventDefault();

        const type = event.shiftKey ? "year" : "month";

        const active = calendar.active.value;

        if (type === "month") {
          const fallback =
            event.key === "PageUp"
              ? active.startOf("month").add(-1, "days")
              : active.endOf("month").add(1, "days").endOf("month");

          if (active.get("date") > fallback.daysInMonth()) {
            calendar.setActive(fallback);
          } else {
            const input = `${active.format("D")}/${fallback.format("MM")}/${fallback.format("YYYY")}`;

            calendar.setActive(dayJs(input, "D/MM/YYYY"));
          }
        } else {
          const year = active.get("year");

          const addition = event.key === "PageUp" ? -1 : 1;

          const firstDateInput = `1/${active.format("MM")}/${year + addition}`;

          const fallback = dayJs(firstDateInput, "D/MM/YYYY").endOf("month");

          if (active.get("date") > fallback.daysInMonth()) {
            calendar.setActive(fallback);
          } else {
            const input = `${active.get("date")}/${fallback.format("MM")}/${fallback.format("YYYY")}`;

            calendar.setActive(dayJs(input, "D/MM/YYYY"));
          }
        }
      }
    },
  });
</script>
