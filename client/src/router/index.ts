import { createRouter, createWebHistory } from "vue-router";
import Homepage from '../views/Homepage.vue';
import Chats from '../views/Chats.vue';
import Login from '../views/Login.vue';
import Friends from '../views/Friends.vue';
import Settings from '../views/Settings.vue';
import {store} from "../store";

const router = createRouter({
    history: createWebHistory(),
    routes: [
        { name: 'home', path: '/', component: Homepage, meta: { requiresAuth: true } },
        { name: 'chats', path: '/chats', component: Chats, meta: { requiresAuth: true } },
        { name: 'friends', path: '/friends', component: Friends, meta: { requiresAuth: true } },
        { name: 'settings', path: '/settings', component: Settings, meta: { requiresAuth: true } },
        { name: 'login', path: '/login', component: Login },
    ],
    scrollBehavior(){
        return { top: 0 }
    }
})

router.beforeEach((to, from, next) => {
    if (to.matched.some(record => record.meta.requiresAuth)) {
        if (!store.getters.isLoggedIn) {
            next({name: 'login'})
        } else {
            next();
        }
    } else {
        next();
    }
})

export default router