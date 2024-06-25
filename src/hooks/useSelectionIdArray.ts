import { ref, unref, type Ref } from "vue";

export interface UseSelectionIdArray {
  selectedIds: Ref<string[]>;
  updateItem(id: string, action: "select" | "deselect"): void;
  updateItems(ids: string[], action: "select" | "deselect"): void;
  toggleItem(id: string): void;
}

/**
+ * Simple hook to have an array of ids
+ * to represent a multi-select selection
+ * or single select selection.
+ */
export const useSelectionIdArray = (
  multiSelect: Ref<boolean> | boolean
): UseSelectionIdArray => {
  const selectedIds = ref<string[]>([]);

  const isSelected = (id: string) => {
    return selectedIds.value.includes(id);
  };

  const selectItem = (id: string) => {
    if (isSelected(id)) {
      return;
    }

    if (unref(multiSelect)) {
      selectedIds.value = [...selectedIds.value, id];
    } else {
      selectedIds.value = [id];
    }
  };

  const deselectItem = (id: string) => {
    if (!isSelected(id)) {
      return;
    }

    if (unref(multiSelect)) {
      selectedIds.value = selectedIds.value.filter(_id => _id !== id);
    } else {
      selectedIds.value = [];
    }
  };

  return {
    selectedIds,

    updateItem(id, action) {
      if (action === "select") {
        selectItem(id);
      } else {
        deselectItem(id);
      }
    },

    updateItems(ids, action) {
      ids.forEach(id => this.updateItem(id, action));
    },

    toggleItem(id) {
      if (selectedIds.value.includes(id)) {
        this.updateItem(id, "deselect");
      } else {
        this.updateItem(id, "select");
      }
    },
  };
};
