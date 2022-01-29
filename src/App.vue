<template>
  <q-layout
    view="lHh lpr lFf"
    style="height: 600px"
    class="shadow-2 rounded-borders window-height"
  >
    
    <BottomNav></BottomNav>

    <q-page-container>
      <q-page>
        <router-view></router-view>
      </q-page>
    </q-page-container>
  </q-layout>
</template>


<script>
import BottomNav from "./components/layouts/BottomNav.vue";
import { useQuasar } from "quasar";
import { useStore } from "vuex";
import { computed } from "vue";

export default {
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
  },
};
</script>