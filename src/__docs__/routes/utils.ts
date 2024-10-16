import type { RouteRecordRaw } from "vue-router";

export * from "./links";

export const componentRoute = (
  title: string
): Pick<RouteRecordRaw, "path" | "name" | "meta"> => {
  const kebabCaseTitle = title
    .replace(/([a-z])([A-Z])/g, "$1-$2")
    .replace(/\s+/g, "-")
    .toLowerCase();

  return {
    path: `/${kebabCaseTitle}`,
    name: kebabCaseTitle,

    meta: {
      title,
    },
  };
};
