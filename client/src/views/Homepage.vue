<template>
  <div class="container">
    <div class="absolute-center text-center full-width">
      <div class="header">
        <p class="title">FUCETI</p>
        <p class="build">alpha build 0.1.1</p>
      </div>
      <div class="actions">
        <div class="discord">
          <div class="text">
            Join our discord for updates
          </div>
          <q-btn href="#">
            <q-icon name="fab fa-discord" class="q-mr-sm" />
            Discord
          </q-btn>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  components: {},
});
</script>

<style scoped>
.container {
}
.title {
  font-weight: 700;
  font-size: 46px;
  margin: 0;
}
.build {
  color: #525252;
}
.actions {
  margin: 60px;
}
.actions .q-btn {
  font-size: 12px;
  padding: 8px 25px;
}
.actions .discord .text {
  margin-bottom: 8px;
}
.actions .discord .q-btn {
  background-color: #2c3e50;
}
</style>