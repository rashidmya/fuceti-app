<template>
  <div class="container">
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
        <div v-for="user in users.users" :key="user.userId" class="">
          <router-link :to="{ name: 'chat', params: { id: user.userId } }">
          <q-item
            clickable
            v-ripple
            dense
          >
            <q-item-section avatar>
              <q-avatar>
                <img src="https://cdn.quasar.dev/img/avatar2.jpg" />
                <q-badge color="red" rounded floating v-if="user.hasNewMessages"/>
              </q-avatar>
            </q-item-section>

            <q-item-section>
              <q-item-label lines="1">Emma</q-item-label>
              <q-item-label caption lines="1">
                I'll be in your neighborhood doing errands this weekend. Do you
                want to grab brunch?
              </q-item-label>
            </q-item-section>

            <q-item-section side top> 1 min ago </q-item-section>
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
</template>

<script lang="ts">
import TheHeader from "../../components/layouts/TheHeader.vue";
import FindDialog from "../../components/ui/FindDialog.vue";
import AddDialog from "../../components/ui/AddDialog.vue";
import { defineComponent, reactive, ref } from "vue";
import socket from "@/utils/socket";

interface UsersReactive {
      connected: boolean;
      messages: Array<string>;
      hasNewMessages: boolean; 
}

interface UsersEvent extends UsersReactive {
    self: boolean;
    userId: string;
}

interface UsersList {
  users: Array<UsersEvent>
}

export default defineComponent({
  components: {
    TheHeader,
    FindDialog,
    AddDialog,
  },
  setup() {
    const addUserDialog = ref(false);
    const findUserDialog = ref(false);
    let users: UsersList = reactive({users:[]})

     const initReactiveProperties = (user: UsersReactive) => {
      user.connected = true;
      user.messages = [];
      user.hasNewMessages = false;
    };

    socket.on('users', (allUsers: Array<UsersEvent>) => {
      allUsers.forEach(user => {
        user.self = user.userId === socket.auth.userId
        initReactiveProperties(user)
      })

      users.users = allUsers.sort((a:any,b:any) => {
        if (a.self) return -1;
        if (b.self) return 1;
        if (a.userId < b.userId) return -1;
        return a.userId > b.userId ? 1 : 0
      });
    });

    socket.on('user connected', user => {
      initReactiveProperties(user);
      users.users.push(user)
    })

    return {
      addUserDialog,
      findUserDialog,
      users
    };
  },
});
</script>
