import { createRouter, createWebHistory } from "vue-router";
import ChatsIndex from "../views/chats/index.vue";
import ChatsShow from "../views/chats/show.vue";
import Login from "../views/Login.vue";
import FriendsIndex from "../views/friends/index.vue";
import Settings from "../views/Settings.vue";
import { store } from "../store";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: "/", redirect: "/chats" },
    { path: "/chats", component: ChatsIndex, meta: { requiresAuth: true } },
    {
      name: "chat",
      path: "/chats/:id",
      component: ChatsShow,
      meta: { requiresAuth: true },
    },
    { path: "/friends", component: FriendsIndex, meta: { requiresAuth: true } },
    { path: "/settings", component: Settings, meta: { requiresAuth: true } },
    { path: "/login", component: Login },
  ],
  scrollBehavior() {
    return { top: 0 };
  },
});

router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (!store.getters.isLoggedIn) {
      next({ name: "login" });
    } else {
      next();
    }
  } else {
    next();
  }
});

export default router;
