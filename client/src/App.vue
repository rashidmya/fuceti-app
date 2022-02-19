<template>
  <div class="WAL relative-position" :style="style">
    <q-layout view="hHh lpR fFf" container>
      <q-page-container>
        <q-page padding>
          <router-view></router-view>
        </q-page>
      </q-page-container>
      <BottomNav v-if="isAuthenticated"></BottomNav>
    </q-layout>
  </div>
</template>

<script lang="ts">
import { defineComponent, onUnmounted } from "vue";
import BottomNav from "./components/layouts/BottomNav.vue";
import { useQuasar } from "quasar";
import { useStore } from "./store/store";
import { computed } from "vue";
import socket from "./utils/socket";
import { User } from "./interfaces/user.interface";

export default defineComponent({
  name: "App",
  components: { BottomNav },
  setup() {
    const $q = useQuasar();
    const store = useStore();

    store.dispatch("auth/verify");
    store.dispatch("auth/autoLogin");

    const isAuthenticated = computed(() => store.getters["auth/isAuthenticated"]);
    const user = computed(() => store.getters["auth/user"]);

    socket.userId = user.value.userId;
    socket.auth = { username: user.value.username, userId: user.value.userId };
    socket.connect();

    const sessionId = localStorage.getItem("sessionId");
    
    if (sessionId) {
      socket.auth = { sessionId };
    }

    socket.on("session", ({ sessionId }) => {
      socket.auth = { sessionId };
      localStorage.setItem("sessionId", sessionId);
    });


    socket.on("connect", () => {
      store.dispatch("user/connect");
    });

    socket.on("disconnect", () => {
      store.dispatch("user/disconnect");
    });

    socket.on("users", (users: Array<User>) => {
      store.dispatch("user/users", { users });
    });

    socket.on("user connected", (user: User) => {
      store.dispatch("user/userConnected", user);
    });

    socket.on("user disconnected", (id: string) => {
      store.dispatch("user/userDisconnected", id);
    });

    socket.on('private message', ({content, from, to}) => {
      store.dispatch('user/getMessage', {content, from, to})
    })

    socket.on("connect_error", (err: Error) => {
      if (err.message === "not logged in") {
        console.log("not logged in");
      }
    });

    onUnmounted(() => {
      socket.off("connect_error");
      socket.off("connect");
      socket.off("disconnect");
      socket.off("users");
      socket.off("user connected");
      socket.off("user disconnected");
      socket.off("private message");
    });

    $q.dark.set(true);
    const style = computed(() => ({
      height: $q.screen.height + "px",
    }));

    return {
      isAuthenticated,
      style,
    };
  },
});
</script>


<style lang="scss">
.WAL {
  width: 100%;
  height: 100%;
}
.WAL__layout {
  margin: 0 auto;
  z-index: 4000;
  height: 100%;
}
#app {
  font-family: Roboto, Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
