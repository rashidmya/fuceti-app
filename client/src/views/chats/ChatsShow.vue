<template>
  <div class="q-pa-md row justify-center">
    <ChatHeader :userOnline="userOnline" @unselect="$emit('unselect')" />
    <div id="chat-container" ref="chatContainer">
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
import {useRoute} from 'vue-router'
import moment from "moment";
import ChatHeader from "../../components/chats/ChatHeader.vue";
import ChatFooter from "../../components/chats/ChatFooter.vue";
import socket from '../../utils/socket'

interface Message {
  text: string[];
  stamp: string;
  sent?: Boolean;
}

export default defineComponent({
  components: {
    ChatHeader,
    ChatFooter,
  },
  setup() {
    const route = useRoute();
    const userOnline = ref(false);
    const messages = ref(new Array());
    const chatContainer = ref<HTMLDivElement>();
    const secondUser = route.params.id

    function sendMessage(newMessage: any) {
      const msg: Message = {
        text: [newMessage.value],
        stamp: `${Date.now()}`,
      };
      socket.emit('private message', {
        msg,
        to: secondUser
      })
      msg.sent = true
      messages.value.push(msg);
      if (chatContainer.value) {
        chatContainer.value.scrollTop = chatContainer.value.scrollHeight;
      }
    }

    socket.on('private message', ({msg, from}) => {
      messages.value.push(msg)
    })

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