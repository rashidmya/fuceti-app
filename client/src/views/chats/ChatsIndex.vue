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
          <div v-for="user in users" :key="user.userId">
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
                    {{
                      user.messages.slice(-1)[0]
                        ? user.messages.slice(-1)[0].content.text[0]
                        : ""
                    }}
                  </q-item-label>
                </q-item-section>

                <q-item-section side top>
                  <div class="status">
                    <q-icon
                      name="fas fa-circle"
                      class="status-icon inline"
                      style="font-size: 8px; margin: auto"
                      :class="{ online: user.connected }"
                    />
                    {{ user.connected ? "Online" : "Offline" }}
                  </div>
                  <div class="stamp">
                    {{
                      user.messages.slice(-1)[0]
                        ? user.messages.slice(-1)[0].content.stamp
                        : ""
                    }}
                  </div>
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
      <router-view
        @unselect="unselectUser"
        @input="onMessage"
        :user="selectedUser"
        @call="onCall"
      ></router-view>
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
import { UserReactive } from "../../interfaces/user.interface";
import { Message } from "../../interfaces/message.interface";

export default defineComponent({
  components: {
    TheHeader,
    FindDialog,
    AddDialog,
  },
  setup() {
    const openChat = ref(false);
    const selectedUser = computed(() => store.getters["user/selectedUser"]);
    const addUserDialog = ref(false);
    const findUserDialog = ref(false);
    const store = useStore();
    const users = computed(() => store.getters["user/getUsers"]);

    function onMessage(content: Message) {
      socket.emit("private message", {
        content,
        to: selectedUser.value.userId,
      });
      store.dispatch("user/sendMessage", content);
    }

    function onCall() {
      socket.emit("call request", selectedUser.value.userId);
    }

    function onSelectUser(user: UserReactive) {
      openChat.value = true;
      store.dispatch("user/selectUser", user);
    }

    function unselectUser() {
      openChat.value = false;
      store.dispatch("user/selectUser", null);
    }

    onUnmounted(() => {});
    return {
      addUserDialog,
      findUserDialog,
      users,
      openChat,
      onSelectUser,
      selectedUser,
      unselectUser,
      onMessage,
      onCall,
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