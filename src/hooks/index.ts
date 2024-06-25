import { nanoid } from "nanoid";

export * from "./useBemClasses";
export * from "./useInput";
export * from "./useKeyboardList";
export * from "./useListBox";
export * from "./useSelectionIdArray";
export * from "./useTree";

export const createRandomId = () => `i${nanoid()}`;
