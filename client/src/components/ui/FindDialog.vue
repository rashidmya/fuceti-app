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
          @click="emit('closeDialog')"
        />
      </q-card-section>

      <q-card-section class="q-pt-none">
          FINDDDDDDDDDDDDDDDDDDDDDD
        <q-input v-model="findUserInput" label="Standard" />
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script lang="ts">
import { defineComponent, toRef, ref } from "vue";

export default defineComponent({
  props: ["showDialog"],
  emits: ["closeDialog"],
  setup(props, { emit }) {
    const prompt = toRef(props, "showDialog");
    const findUserInput = ref("");

    return {
      prompt,
      findUserInput,
      emit,
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