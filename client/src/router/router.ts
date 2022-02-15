import { createRouter, createWebHistory } from "vue-router";
import ChatsIndex from "../views/chats/ChatsIndex.vue";
import ChatsShow from "../views/chats/ChatsShow.vue";
import Settings from '@/views/Settings.vue'
import Auth from "../views/Auth.vue";
import { store } from "../store/store";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      name: "home",
      path: "/",
      component: ChatsIndex,
      meta: { requiresAuth: true },
      children: [
        {
          name: "chat",
          path: "/:id",
          component: ChatsShow,
        },
      ],
    },
    {
      name: "settings",
      path: "/settings",
      component: Settings,
      meta: { requiresAuth: true },
    },
    {
      name: "auth",
      path: "/auth",
      component: Auth,
      meta: { requiresGuest: true },
    },
  ],
  scrollBehavior() {
    return { top: 0 };
  },
});

router.beforeEach((to, from, next) => {
  const auth = store.getters["auth/isLoggedIn"];

  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (!auth) {
      next({ name: "auth" });
    } else {
      next();
    }
  } else if (to.matched.some((record) => record.meta.requiresGuest)) {
    if (auth) {
      next({ name: "home" });
    } else {
      next();
    }
  }
});

export default router;
