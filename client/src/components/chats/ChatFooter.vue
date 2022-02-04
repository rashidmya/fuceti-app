<template>
  <q-footer elevated class="bg-dark">
    <q-toolbar>
      <q-form @submit.prevent="sendMessage" class="full-width message-form">
        <q-input
          rounded
          v-model.trim="newMessage"
          class="message-input"
          dense
          outlined
        >
          <template #before>
            <q-icon
              @click.prevent="sendMessage"
              class="action-button"
              name="fas fa-camera"
              color="primary"
            />
          </template>
          <template #after>
            <q-icon
              class="action-button send"
              @click.prevent="sendMessage"
              name="send"
              color="primary"
            />
          </template>
        </q-input>
      </q-form>
    </q-toolbar>
  </q-footer>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from "vue";

export default defineComponent({
  emits: ["newMessage"],
  setup(_, { emit }) {
    const newMessage = ref("");

    function sendMessage() {
      if (newMessage.value === "") return;
      emit("newMessage", newMessage);
      newMessage.value = "";
    }

    onMounted(() => {
      (document.querySelector(".message-input")! as HTMLInputElement).focus();
    });

    return {
      sendMessage,
      newMessage,
    };
  },
});
</script>

<style scoped>
.q-footer .message-input {
  color: black !important;
  margin-bottom: 6px;
}
.message-form {
  padding: 15px 0;
}
.q-input .action-button {
  margin: 0 10px;
  font-size: 20px;
}
.q-input .action-button.send {
  font-size: 25px;
}
.q-input .action-button:active{
   color: #6caae0 !important;
   transition: all 0.1s ease-in;
}
</style>