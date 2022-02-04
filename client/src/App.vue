<template>
  <q-layout
    view="hHh lpR fFf"
  >
    <BottomNav v-if="isLoggedIn"></BottomNav>

    <q-page-container>
      <q-page padding>
        <router-view></router-view>
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import BottomNav from "./components/layouts/BottomNav.vue";
import { useQuasar } from "quasar";
import { useStore } from "./store";
import { computed } from "vue";

export default defineComponent({
  name: "App",
  components: { BottomNav },
  setup() {
    const $q = useQuasar();
    const store = useStore();
    const isLoggedIn = computed(() => store.getters.isLoggedIn)
    $q.dark.set(true);
    return {
      isLoggedIn
    }
  }
})
</script>


<style lang="scss">
#app {
  font-family: Roboto, Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
