import { pathNames } from "../constants";
import type { RouteRecordRaw } from "vue-router";
import { createRouter, createMemoryHistory } from "vue-router";

const importView = (name: string): Promise<string> =>
  import(`../pages/${name}/index.vue`);

export const router: any = createRouter({
  history: createMemoryHistory(),
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
    { path: "/:pathMatch(.*)*", redirect: pathNames.commingSoon },
  ] as RouteRecordRaw[],
});
