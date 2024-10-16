import type { RouteRecordRaw } from "vue-router";

export type LinkRouteMeta = {
  title: string;
};

export type LinkRouteRecord = RouteRecordRaw & {
  meta: LinkRouteMeta;
};

export const isValidLinkRouteRecord = (
  route: RouteRecordRaw
): route is LinkRouteRecord => {
  return !!route.meta?.title && !!route.name;
};

export const routeRecordToLink = (route: LinkRouteRecord) => ({
  key: route.path,
  title: route.meta.title,

  to: { name: route.name },
});
