<template>
  <div class="q-pa-md row justify-center">
    <ChatHeader :userOnline="userOnline" />
    <div id="chat-container" ref="chatContainer">
      <q-chat-message
        :text="['hey, how are you?']"
        stamp="7 minutes ago"
        sent
      />
      <q-chat-message
        :text="[
          'I just feel like typing a really, really, REALLY long message to annoy you...',
        ]"
        stamp="4 minutes ago"
        text-color="black"
        bg-color="blue-3"
      />
      <q-chat-message
        v-for="x in 3"
        :key="x"
        :text="['Did it work?']"
        stamp="1 minutes ago"
        text-color="black"
        bg-color="blue-3"
      />
      <q-chat-message
        v-for="m in messages"
        :key="m"
        :text="m.text"
        :stamp="moment(parseInt(m.stamp)).fromNow()"
        :sent="m.sent"
      />
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
    const chatContainer = ref<HTMLDivElement>();

    function sendMessage(newMessage: any) {
      const msg: Message = {
        text: [newMessage.value],
        stamp: `${Date.now()}`,
        sent: true,
      };
      messages.value.push(msg);
      if (chatContainer.value) {
        chatContainer.value.scrollTop = chatContainer.value.scrollHeight;
      }
    }

    return {
      userOnline,
      sendMessage,
      messages,
      moment,
      chatContainer,
    };
  },
});
</script>

<style scoped>
#chat-container {
  height: 100%;
  width: 100%;
}
.q-message {
  z-index: 1;
}
</style>