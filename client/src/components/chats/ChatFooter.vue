<template>
  <q-footer elevated class="bg-dark">
    <q-toolbar>
      <q-form @submit.prevent="sendMessage" class="full-width message-form">
        <q-input
          rounded
          v-model.trim="newMessage"
          placeholder="Message"
          class="message-input"
          dense
          outlined
        >
        <template #append>
                      <q-btn
              round
              dense
              flat
              @submit.prevent="sendMessage"
              icon="camera"
              color="primary"
            />
        </template>
          <template #after>
            <q-btn
              round
              dense
              flat
              @submit.prevent="sendMessage"
              icon="send"
              color="primary"
            />
          </template>
        </q-input>
      </q-form>
    </q-toolbar>
  </q-footer>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";

export default defineComponent({
  emits: ["newMessage"],
  setup(_, { emit }) {
    const newMessage = ref("");

    function sendMessage() {
            if (newMessage.value === "") return;
      emit("newMessage", newMessage);
      newMessage.value = ''
    }
    return {
      sendMessage,
      newMessage
    };
  },
});
</script>

<style scoped>
.q-footer .message-input {
  color: black !important;
}
</style>