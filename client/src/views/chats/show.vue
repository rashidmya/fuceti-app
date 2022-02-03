<template>
  <div class="page-chat flex column">
    <ChatHeader :userOnline="userOnline" />
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
    <ChatFooter @newMessage="sendMessage" />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import moment from "moment";
import ChatHeader from "../../components/chats/ChatHeader.vue";
import ChatFooter from "../../components/chats/ChatFooter.vue";

interface Message {
  text: string[];
  stamp: string;
  sent: Boolean;
}

export default defineComponent({
  components: {
    ChatHeader,
    ChatFooter,
  },
  setup() {
    const userOnline = ref(false);
    const messages = ref(new Array());

    function sendMessage(newMessage: any) {
      const msg: Message = {
        text: [newMessage.value],
        stamp: `${Date.now()}`,
        sent: true,
      };
      messages.value.push(msg);
    }

    return {
      userOnline,
      sendMessage,
      messages,
      moment,
    };
  },
});
</script>

<style scoped>
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
</style>