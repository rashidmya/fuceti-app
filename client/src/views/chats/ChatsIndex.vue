<template>
  <div class="container">
    <div class="users-list" v-if="!openChat">
      <the-header>
        <template #default> Chats </template>
        <template #action>
          <q-icon
            name="fas fa-user-plus"
            @click="addUserDialog = !addUserDialog"
          ></q-icon>
        </template>
      </the-header>

      <div class="chat-list">
        <q-list padding separator>
          <div v-for="user in users" :key="user.userId" class="">
            <router-link
              :to="{ name: 'chat', params: { id: user.userId } }"
              @click="onSelectUser(user)"
            >
              <q-item clickable v-ripple dense>
                <q-item-section avatar>
                  <q-avatar>
                    <img src="https://cdn.quasar.dev/img/avatar2.jpg" />
                    <q-badge
                      color="red"
                      rounded
                      floating
                      v-if="user.hasNewMessages"
                    />
                  </q-avatar>
                </q-item-section>

                <q-item-section>
                  <q-item-label lines="1">{{ user.username }}</q-item-label>
                  <q-item-label caption lines="1">
                    I'll be in your neighborhood doing errands this weekend. Do
                    you want to grab brunch?
                  </q-item-label>
                </q-item-section>

                <q-item-section side top>
                  <q-icon
                    name="fas fa-circle"
                    class="status-icon"
                    :class="{ online: user.connected }"
                  />
                </q-item-section>
              </q-item>
            </router-link>
            <q-separator spaced inset="item" />
          </div>
        </q-list>
      </div>

          <AddDialog
      @closeDialog="addUserDialog = !addUserDialog"
      :showDialog="addUserDialog"
    ></AddDialog>

    <FindDialog
      @closeDialog="findUserDialog = !findUserDialog"
      :showDialog="findUserDialog"
    ></FindDialog>

    <q-page-sticky position="bottom-right" :offset="[18, 18]">
      <q-btn
        fab
        icon="fas fa-pencil-alt"
        color="blue-6"
        @click="findUserDialog = !findUserDialog"
      />
    </q-page-sticky>
    </div>
    <div class="chat-window" v-else>
      <router-view @unselect="unselectUser" @input="onMessage" :user="selectedUser"></router-view>
    </div>
  </div>
</template>

<script lang="ts">
import TheHeader from "../../components/layouts/TheHeader.vue";
import FindDialog from "../../components/ui/FindDialog.vue";
import AddDialog from "../../components/ui/AddDialog.vue";
import { defineComponent, ref, onUnmounted, computed } from "vue";
import { useStore } from "../../store/store";
import socket from "../../utils/socket";
import { User, UserReactive } from "../../interfaces/user.interface";
import { Message } from "../../interfaces/message.interface";

export default defineComponent({
  components: {
    TheHeader,
    FindDialog,
    AddDialog,
  },
  setup() {
    const openChat = ref(false);
    const selectedUser = computed(()=> store.getters['user/selectedUser'])
    const addUserDialog = ref(false);
    const findUserDialog = ref(false);
    const store = useStore();
    const users = computed(() => store.getters["user/getUsers"]);

    function onMessage(msg: Message){
      socket.emit('private message', {
        msg,
        to: selectedUser.value.userId
      })
      msg.sent = true
      store.dispatch('user/sendMessage', msg)
    }

    function onSelectUser(user: UserReactive){
      openChat.value = true
      store.dispatch('user/selectUser', user)
    }

    function unselectUser(){
      openChat.value = false
      store.dispatch('user/selectUser', null)
    }

    socket.on("connect", () => {
      store.dispatch("user/connect");
    });

    socket.on("disconnect", () => {
      store.dispatch("user/disconnect");
    });

    socket.on("users", (users: Array<User>) => {
      store.dispatch("user/users", { users, socket });
    });

    socket.on("user connected", (user: User) => {
      store.dispatch("user/userConnected", user);
    });

    socket.on("user disconnected", (id: string) => {
      store.dispatch("user/userDisconnected", id);
    });

    socket.on('private message', ({msg, from}) => {
      store.dispatch('user/getMessage', {msg, from})
    })

    onUnmounted(() => {
      socket.off("connect");
      socket.off("disconnect");
      socket.off("users");
      socket.off("user connected");
      socket.off("user disconnected");
      socket.off("private message");
    });
    return {
      addUserDialog,
      findUserDialog,
      users,
      openChat,
      onSelectUser,
      selectedUser,
      unselectUser,
      onMessage
    };
  },
});
</script>

<style scoped>
.status {
  font-weight: 400;
  font-size: 12px;
  color: gray;
}
.status-icon {
  font-size: 8px;
  color: red;
}
.status-icon.online {
  color: green;
}
</style>