<template>
  <div class="page-chat flex column">
    <q-header class="text-center bg-dark fixed-top">
      <div class="user-info">
        <q-icon
          name="fas fa-circle"
          class="status"
          :class="{ online: userOnline }"
        />
        Will Smith
      </div>
    </q-header>
    <div class="q-pa-md row justify-center">
      <div id="chat-container" style="width: 100%; max-width: 400px">
        <q-chat-message
          name="me"
          avatar="https://cdn.quasar.dev/img/avatar3.jpg"
          :text="['hey, how are you?']"
          stamp="7 minutes ago"
          sent
          bg-color="amber-7"
        />
        <q-chat-message
          name="Jane"
          avatar="https://cdn.quasar.dev/img/avatar5.jpg"
          :text="[
            'doing fine, how r you?',
            'I just feel like typing a really, really, REALLY long message to annoy you...',
          ]"
          size="6"
          stamp="4 minutes ago"
          text-color="white"
          bg-color="primary"
        />
        <q-chat-message
          name="Jane"
          avatar="https://cdn.quasar.dev/img/avatar5.jpg"
          :text="['Did it work?']"
          stamp="1 minutes ago"
          size="8"
          text-color="white"
          bg-color="primary"
        />
        <q-chat-message
          v-for="m in messages"
          :key="m"
          :name="m.name"
          :avatar="m.avatar"
          :text="m.text"
          :stamp="m.stamp"
          :sent="m.sent"
          :bg-color="m.bgColor"
        />
      </div>
    </div>
    <q-footer elevated class="bg-dark">
      <q-toolbar>
        <q-form @submit="sendMessage" class="full-width message-form">
          <q-input
            rounded
            v-model="newMessage"
            placeholder="Message"
            class="message-input"
            dense
            outlined
          >
            <template #after>
              <q-btn
                round
                dense
                flat
                @submit="sendMessage"
                icon="send"
                color="primary"
              />
            </template>
          </q-input>
        </q-form>
      </q-toolbar>
    </q-footer>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";

export default defineComponent({
  setup() {
    const otherUserDetails = { online: true };
    const newMessage = ref("");
    const userOnline = ref(false);
    const messages = ref([
      {
        name: "me",
        avatar: "https://cdn.quasar.dev/img/avatar3.jpg",
        text: ["hey, how are you?"],
        stamp: "7 minutes ago",
        sent: true,
        bgColor: "amber-7",
      },
    ]);

    function sendMessage() {
      const msg = {
        name: "me",
        avatar: "https://cdn.quasar.dev/img/avatar3.jpg",
        text: [newMessage.value],
        stamp: "7 minutes ago",
        sent: true,
        bgColor: "amber-7",
      };
      messages.value.push(msg);
    }

    return {
      otherUserDetails,
      newMessage,
      userOnline,
      sendMessage,
      messages,
    };
  },
});
</script>

<style>
.page-chat::after {
  content: "";
  display: block;
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  z-index: 0;
  opacity: 0.1;
  background-image: radial-gradient(
      circle at 100% 150%,
      silver 24%,
      white 24%,
      white 28%,
      silver 28%,
      silver 36%,
      white 36%,
      white 40%,
      transparent 40%,
      transparent
    ),
    radial-gradient(
      circle at 0 150%,
      silver 24%,
      white 24%,
      white 28%,
      silver 28%,
      silver 36%,
      white 36%,
      white 40%,
      transparent 40%,
      transparent
    ),
    radial-gradient(
      circle at 50% 100%,
      white 10%,
      silver 10%,
      silver 23%,
      white 23%,
      white 30%,
      silver 30%,
      silver 43%,
      white 43%,
      white 50%,
      silver 50%,
      silver 63%,
      white 63%,
      white 71%,
      transparent 71%,
      transparent
    ),
    radial-gradient(
      circle at 100% 50%,
      white 5%,
      silver 5%,
      silver 15%,
      white 15%,
      white 20%,
      silver 20%,
      silver 29%,
      white 29%,
      white 34%,
      silver 34%,
      silver 44%,
      white 44%,
      white 49%,
      transparent 49%,
      transparent
    ),
    radial-gradient(
      circle at 0 50%,
      white 5%,
      silver 5%,
      silver 15%,
      white 15%,
      white 20%,
      silver 20%,
      silver 29%,
      white 29%,
      white 34%,
      silver 34%,
      silver 44%,
      white 44%,
      white 49%,
      transparent 49%,
      transparent
    );
  background-size: 100px 50px;
}
.q-message {
  z-index: 1;
}
.message-form {
  padding: 15px;
}
.message-input {
  color: black !important;
}
.q-header {
  z-index: 2;
  padding: 15px 0;
}
.q-header .user-info {
  font-size: 18px;
  font-weight: 700;
}
.q-header .status {
  font-size: 8px;
  color: red;
}
.q-header .online {
  color: green;
}
</style>