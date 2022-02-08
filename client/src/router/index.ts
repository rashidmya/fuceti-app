import { createRouter, createWebHistory } from "vue-router";
import ChatsIndex from "../views/chats/ChatsIndex.vue";
import ChatsShow from "../views/chats/ChatsShow.vue";
import Auth from "../views/Auth.vue";
import FriendsIndex from "../views/friends/FriendsIndex.vue";
import Settings from "../views/Settings.vue";
import { store } from "../store";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { name: "home", path: "/", redirect: "/chats" },
    { path: "/chats", component: ChatsIndex, meta: { requiresAuth: true } },
    {
      name: "chat",
      path: "/chats/:id",
      component: ChatsShow,
      meta: { requiresAuth: true },
    },
    { path: "/friends", component: FriendsIndex, meta: { requiresAuth: true } },
    { path: "/settings", component: Settings, meta: { requiresAuth: true } },
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
  const auth = store.getters.isLoggedIn

  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (!auth) {
      next({ name: "auth" });
    } else {
      next();
    }
  } else if (to.matched.some((record) => record.meta.requiresGuest)) {
    if (auth) {
      next({name: 'home'})
    } else {
      next()
    }
  }
});

export default router;
