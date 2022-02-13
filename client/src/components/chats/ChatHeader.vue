<template>
  <q-header class="bg-dark fixed-top">
    <div class="row inline full-width">
      <q-btn class="button" to="/" @click="$emit('unselect')">
        <q-icon
          style="font-size: 20px"
          color="primary"
          name="fas fa-chevron-left q-my-md q-mx-md"
        />
      </q-btn>
      <div class="profile row inline q-ml-xs">
        <q-avatar>
          <img src="https://cdn.quasar.dev/img/avatar.png" />
        </q-avatar>
        <div class="user-info">
          <div class="name">Will Smith</div>
          <div class="status">
            <q-icon
              name="fas fa-circle"
              class="status-icon"
              :class="{ online: userOnline }"
            />
            Offline
          </div>
        </div>
      </div>
      <div class="call-buttons">
        <div class="row inline">
          <q-icon color="primary" name="fas fa-video" class="call" />
          <q-icon color="primary" name="fas fa-phone" class="call" />
        </div>
      </div>
    </div>
  </q-header>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  props: ["userOnline"],
});
</script>


<style scoped>
.q-header {
  z-index: 2;
  padding: 10px 0;
}
.q-header .profile {
  margin: auto auto auto 0;
}
.q-header .user-info {
  margin: auto auto auto 8px;
}
.q-header .name {
  font-size: 14px;
  font-weight: 700;
}
.q-header .status {
  font-weight: 400;
  font-size: 12px;
  color: gray;
}
.q-header .status-icon {
  font-size: 8px;
  color: red;
}
.q-header .status-icon.online {
  color: green;
}
.q-header .call-buttons {
  margin: auto 8px auto auto;
}
.q-header .call-buttons .call {
  font-size: 20px;
  margin: 0 10px 0 10px;
}
.q-header .call-buttons .call:active {
  color: #6caae0 !important;
  transition: all 0.1s ease-in;
}
</style>