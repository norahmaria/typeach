import type { UseTree } from "@/hooks";
import type { ComputedRef, InjectionKey, Ref } from "vue";

export interface TreeContext {
  count: Ref<number>;
  tree: UseTree;
  level: ComputedRef<number>;
}

export interface TreeItemContext {
  id: Ref<string>;
  selected: Ref<boolean>;
  toggle(): void;
}

export const TreeContextKey: InjectionKey<TreeContext> = Symbol("peachy-tree");

export const TreeItemContextKey: InjectionKey<TreeItemContext> =
  Symbol("peachy-tree-item");
