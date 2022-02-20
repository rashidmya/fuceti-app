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
      <ChatFooter @sendMessage="sendMessage" />
    </div>
    <q-dialog
      v-model="callDialog"
      persistent
      maximized
      transition-show="fade"
      transition-hide="fade"
    >
      <q-card class="bg-blue-grey text-white">
        <q-card-section class="q-mt-xl q-mb-none text-center">
          <div class="text-h4">{{ user.username }}</div>
          <div class="calling">calling {{ user.username }}...</div>
        </q-card-section>

        <q-card-section class="q-pt-none absolute-center">
          <q-avatar size="200px">
            <img src="https://cdn.quasar.dev/img/avatar.png" />
          </q-avatar>
        </q-card-section>
        <q-card-actions>
          <q-card class="buttons bg-blue-grey-8">
            <q-card-section class="row items-center no-wrap">
              <div>
                <div class="text-weight-bold">The Walker</div>
                <div class="text-grey">Fitz & The Tantrums</div>
              </div>

              <q-space />

              <q-btn flat round icon="fast_forward" @click="onDeclineCall"/>
            </q-card-section>
          </q-card>
        </q-card-actions>
      </q-card>
    </q-dialog>
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
  emits: ["input", "unselect", "call"],
  setup(props, { emit }) {
    const chatContainer = ref<HTMLDivElement>();
    const callDialog = ref(false);

    function sendMessage(newMessage: string) {
      const content: Content = {
        text: [newMessage],
        stamp: `${moment(Date.now()).format("LT")}`,
      };
      emit("input", content);

      if (chatContainer.value) {
        console.log(chatContainer.value);
        chatContainer.value.scrollTop = chatContainer.value.scrollHeight;
      }
    }

    function call() {
      emit("call");
      callDialog.value = true;
    }

    socket.on("call hangup", () => {
      callDialog.value = false;
    });

    function onDeclineCall(){
      const user = props.user
      socket.emit('call decline', user);
      callDialog.value = false
    }

    return {
      sendMessage,
      chatContainer,
      callDialog,
      call,
      onDeclineCall
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
.calling {
  color: rgba(255, 255, 255, 0.589);
}
.buttons {
  position: absolute;
  bottom: 0;
  width: 90%;
  height: 100px;
  left: 0;
  right: 0;
  margin-left: auto;
  margin-right: auto;
}
</style>