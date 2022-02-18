<template>
  <div class="q-pa-md row justify-center">
    <ChatHeader :user="user" @unselect="$emit('unselect')" />
    <div id="chat-container" ref="chatContainer">
      <q-chat-message
        v-for="m in user.messages"
        :key="m"
        :text="m.content.text"
        :stamp="moment(parseInt(m.content.stamp)).fromNow()"
        :sent="m.sent"
      />
    </div>
    <ChatFooter @sendMessage="sendMessage" />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import moment from "moment";
import ChatHeader from "../../components/chats/ChatHeader.vue";
import ChatFooter from "../../components/chats/ChatFooter.vue";
import { Content } from "../../interfaces/message.interface";

export default defineComponent({
  components: {
    ChatHeader,
    ChatFooter,
  },
  props: ["user"],
  emits: ["input", "unselect"],
  setup(_, { emit }) {
    const chatContainer = ref<HTMLDivElement>();

    function sendMessage(newMessage: string) {
      const content: Content = {
        text: [newMessage],
        stamp: `${Date.now()}`,
      };
      emit("input", content);

      if (chatContainer.value) {
        chatContainer.value.scrollTop = chatContainer.value.scrollHeight;
      }
    }

    return {
      sendMessage,
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