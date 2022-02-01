<template>
  <div class="page-chat flex column">
    <q-header class="bg-dark fixed-top">
      <div class="row inline full-width">
        <div class="back-button">
          <router-link class="button" to="/chats">
            <q-icon
              style="font-size: 20px"
              color="primary"
              name="fas fa-chevron-left q-my-md q-mx-md"
            />
          </router-link>
        </div>
        <div class="profile row inline q-ml-xs">
          <q-avatar>
            <img src="https://cdn.quasar.dev/img/avatar.png" />
          </q-avatar>
          <div class="user-info">
            <div class="name">Will Smith</div>
            <div class="status">
              <q-icon
                name="fas fa-circle"
                class="status-icon"
                :class="{ online: userOnline }"
              />
              Offline
            </div>
          </div>
        </div>
        <div class="call-buttons full">
          <div class="row inline">
            <q-icon color="primary" name="fas fa-video" class="call" />
            <q-icon color="primary" name="fas fa-phone" class="call" />
          </div>
        </div>
      </div>
    </q-header>
    <div class="q-pa-md row justify-center">
      <div id="chat-container" class="full-width">
        <q-chat-message
          :text="['hey, how are you?']"
          stamp="7 minutes ago"
          sent
        />
        <q-chat-message
          :text="[
            'doing fine, how r you?',
            'I just feel like typing a really, really, REALLY long message to annoy you...',
          ]"
          stamp="4 minutes ago"
          text-color="black"
          bg-color="pink-11"
        />
        <q-chat-message
          :text="['Did it work?']"
          stamp="1 minutes ago"
          text-color="black"
          bg-color="pink-11"
        />
        <q-chat-message
          v-for="m in messages"
          :key="m"
          :text="m.text"
          :stamp="moment(parseInt(m.stamp)).fromNow()"
          :sent="m.sent"
        />
      </div>
    </div>
    <q-footer elevated class="bg-dark">
      <q-toolbar>
        <q-form @submit="sendMessage" class="full-width message-form">
          <q-input
            rounded
            v-model.trim="newMessage"
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
import moment from "moment";

interface Message {
  text: string[];
  stamp: string;
  sent: Boolean;
}

export default defineComponent({
  setup() {
    const otherUserDetails = { online: true };
    const newMessage = ref("");
    const userOnline = ref(false);
    const messages = ref(new Array);
    console.log(messages.value);

    function sendMessage() {
      if (newMessage.value === "") return;
      const msg: Message = {
        text: [newMessage.value],
        stamp: `${Date.now()}`,
        sent: true,
      };
      messages.value.push(msg);
      newMessage.value = "";
    }

    return {
      otherUserDetails,
      newMessage,
      userOnline,
      sendMessage,
      messages,
      moment,
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
  opacity: 0.01;
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
  padding: 10px 0;
}
.q-header .profile {
  margin: auto auto auto 0;
}
.q-header .user-info {
  margin: auto auto auto 8px;
}
.q-header .name {
  font-size: 14px;
  font-weight: 700;
}
.q-header .status {
  font-weight: 400;
  font-size: 12px;
  color: gray;
}
.q-header .status-icon {
  font-size: 8px;
  color: red;
}
.q-header .status-icon.online {
  color: green;
}
.q-header .call-buttons {
  margin: auto 8px auto auto;
}
.q-header .call-buttons .call {
  font-size: 20px;
  margin: 0 8px 0 18px;
}
</style>