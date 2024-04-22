import { pathNames } from "../constants";
import type { RouteRecordRaw } from "vue-router";
import {
  createRouter,
  createMemoryHistory,
  createWebHistory,
} from "vue-router";

const importView = (name: string): Promise<string> =>
  import(`../pages/${name}/index.vue`);

export const router: any = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: pathNames.home,
      name: "home",
      component: () => importView("Home"),
    },
    {
      path: pathNames.commingSoon,
      name: "commingSoon",
      component: () => importView("Error"),
    },
    {
      path: pathNames.inosuke,
      name: "inosuke",
      component: () => importView("Inosuke"),
    },
    {
      path: pathNames.sushi,
      name: "sushi",
      component: () => importView("Sushi"),
    },
    { path: "/:pathMatch(.*)*", redirect: pathNames.commingSoon },
  ] as RouteRecordRaw[],
});
