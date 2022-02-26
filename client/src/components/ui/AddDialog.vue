<template>
  <q-dialog
    v-model="prompt"
    persistent
    maximized
    transition-show="slide-up"
    transition-hide="slide-down"
  >
    <q-card class="bg-dark text-white">
      <q-card-section>
        <q-btn
          flat
          dense
          icon="fas fa-chevron-down"
          label="back"
          color="white"
          @click="$emit('closeDialog')"
        />
      </q-card-section>

      <q-card-section class="q-pt-none">
          Add a User bruh
        <q-input v-model="addUserInput" label="Standard" />
        <button @click="addUser">Add</button>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script lang="ts">
import { defineComponent, toRef, ref } from "vue";
import { useQuasar } from "quasar";

export default defineComponent({
  props: ["showDialog"],
  emits: ["closeDialog"],
  setup(props, { emit }) {
    const $q = useQuasar();
    
    const prompt = toRef(props, "showDialog");
    const addUserInput = ref("");

    function addUser() {
      addUserInput.value = "";
      emit("closeDialog");

      $q.notify({
        badgeClass: "alert-badge",
        message: "Friend request has been sent!",
        position: 'top'
      });
    }

    return {
      prompt,
      addUserInput,
      addUser,
    };
  },
});
</script>

<style scoped>
.alert-badge {
  color: pink;
  background: white;
  width: 100% !important;
  height: 100% !important;
}
</style>