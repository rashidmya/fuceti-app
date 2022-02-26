<template>
  <div>
    <div class="q-pa-md row justify-center">
      <ChatHeader :user="user" @unselect="$emit('unselect')" @call="call" />
      <div id="chat-container" ref="chatContainer" scroll>
        <q-chat-message
          v-for="m in user.messages"
          :key="m"
          :text="m.content.text"
          :stamp="m.content.stamp"
          :sent="m.sent"
        />
      </div>
      <ChatFooter @sendMessage="onMessage" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import moment from "moment";
import ChatHeader from "../../components/chats/ChatHeader.vue";
import ChatFooter from "../../components/chats/ChatFooter.vue";
import { Content } from "../../interfaces/message.interface";
import socket from "../../utils/socket";

export default defineComponent({
  components: {
    ChatHeader,
    ChatFooter,
  },
  props: ["user"],
  emits: ["onMessage", "unselect", "call"],
  setup(props, { emit }) {
    const chatContainer = ref<HTMLDivElement>();

    function onMessage(message: string) {
      const content: Content = {
        text: [message],
        stamp: `${moment(Date.now()).format("LT")}`,
      };
      emit("onMessage", content);

      if (chatContainer.value) {
        console.log(chatContainer.value);
        chatContainer.value.scrollTop = chatContainer.value.scrollHeight;
      }
    }

    function call() {
      emit("call", props.user);
    }

    return {
      onMessage,
      chatContainer,
      call,
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