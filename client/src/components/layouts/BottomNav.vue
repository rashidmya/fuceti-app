<template>
  <q-footer bordered>
    <q-tabs
      no-caps
      active-color="blue-3"
      indicator-color="transparent"
      class="bg-dark text-grey"
      v-model="tab"
    >
      <q-route-tab to="/" name="home">
        <q-badge
          v-if="notificationCount > 0"
          color="red"
          rounded
          floating
          :label="notificationCount"
        />
        <q-icon name="fas fa-comment-alt"> </q-icon>

        Chats
      </q-route-tab>
      <q-route-tab to="/settings" name="settings">
        <q-icon name="fas fa-cog"> </q-icon>
        Settings
      </q-route-tab>
    </q-tabs>
  </q-footer>
</template>

<script lang="ts">
import { defineComponent, ref, watch, computed } from "vue";
import { useStore } from "../../store/store";

export default defineComponent({
  setup() {
    const store = useStore();
    
    const notifications = computed(() => store.getters["user/notifications"]);
    const notificationCount = ref(notifications.value);

    watch(notifications, (val) => {
      notificationCount.value = val;
    });
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