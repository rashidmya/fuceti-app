<template>
  <q-footer bordered>
    <q-tabs
      no-caps
      active-color="blue-3"
      indicator-color="transparent"
      class="bg-dark text-grey"
      v-model="tab"
    >
      <q-route-tab to="/friends" name="friends">
        <q-icon name="fas fa-user-friends" /> Friends
      </q-route-tab>
      <q-route-tab to="/chats" name="chats">
        <q-icon name="fas fa-comment-alt">
          <q-badge v-if="notificationCount" color="red" rounded floating :label="notificationCount" />
        </q-icon>
        Chats
      </q-route-tab>
      <q-route-tab to="/settings" name="settings">
        <q-icon name="fas fa-cog" /> Settings
      </q-route-tab>
    </q-tabs>
  </q-footer>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from "vue";

export default defineComponent({
  setup() {
    const notificationCount = ref(21);
    onMounted(() => {});

    return {
      tab: ref("home"),
      notificationCount,
    };
  },
});
</script>


<style scoped>
.q-footer {
  z-index: 0;
}
.fas {
  font-size: 20px;
}
.q-tab {
  padding: 6px 0;
  font-size: 12px;
}
.q-badge {
    font-family: Roboto, Avenir, Helvetica, Arial, sans-serif;
}
</style>