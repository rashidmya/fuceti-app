<template>
  <q-footer bordered>
    <q-tabs
      no-caps
      active-color="blue-3"
      indicator-color="transparent"
      class="bg-dark text-grey"
      v-model="tab"
    >
      <q-route-tab to="/" name="home" > <q-icon name="fas fa-info-circle" /> </q-route-tab>
      <q-route-tab to="/friends" name="friends" > <q-icon name="fas fa-user-friends" /> </q-route-tab>
      <q-route-tab to="/chats" name="chats" > <q-icon name="fas fa-comment-alt" /> </q-route-tab>
      <q-route-tab to="/settings" name="settings" > <q-icon name="fas fa-cog" /> </q-route-tab>
    </q-tabs>
  </q-footer>
</template>

<script>
import { ref } from "vue";
export default {
  setup() {

    return {
      tab: ref("home"),
    };
  },
};
</script>

<style scoped>
.fas {
    font-size: 20px;
}
.q-tab {
    padding: 6px 0;
    font-size: 12px;
}
</style>