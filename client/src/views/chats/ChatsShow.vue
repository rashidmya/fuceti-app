<template>
  <div class="q-pa-md row justify-center">
    <ChatHeader :userOnline="userOnline" @unselect="$emit('unselect')" />
    <div id="chat-container" ref="chatContainer">
      <q-chat-message
        v-for="m in user.messages"
        :key="m"
        :text="m.text"
        :stamp="moment(parseInt(m.stamp)).fromNow()"
        :sent="m.sent"
      />
    </div>
    <ChatFooter @sendMessage="sendMessage" />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from "vue";
import moment from "moment";
import ChatHeader from "../../components/chats/ChatHeader.vue";
import ChatFooter from "../../components/chats/ChatFooter.vue";
import {useStore} from '../../store/store'

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
  props: ['user'],
  emits: ['input','unselect'],
  setup(_, {emit}) {
    const store = useStore();
    const userOnline = ref(false);
    const chatContainer = ref<HTMLDivElement>();

    function sendMessage(newMessage: any) {
      const msg: Message = {
        text: [newMessage.value],
        stamp: `${Date.now()}`,
      };
      emit('input', msg)
      
      if (chatContainer.value) {
        chatContainer.value.scrollTop = chatContainer.value.scrollHeight;
      }
    }

    const messages = computed(()=> store.getters.messages)

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