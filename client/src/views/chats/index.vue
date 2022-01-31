<template>
  <div class="container">
    <q-header bordered class="bg-dark text-white q-pa-xs">
      <q-toolbar>
        <q-toolbar-title class="text-center"> Chats </q-toolbar-title>
        <div>
          <q-icon name="fas fa-pen" @click="prompt = !prompt" />
        </div>
      </q-toolbar>
    </q-header>

    <div class="content">
      <q-list padding separator>
        <div v-for="r in 15" :key="r" class="">
          <q-item
            clickable
            v-ripple
            dense
          >
            <q-item-section avatar>
              <q-avatar>
                <img src="https://cdn.quasar.dev/img/avatar2.jpg" />
              </q-avatar>
            </q-item-section>

            <q-item-section>
              <q-item-label lines="1">Emma</q-item-label>
              <q-item-label caption lines="2">
                I'll be in your neighborhood doing errands this weekend. Do you
                want to grab brunch?
              </q-item-label>
            </q-item-section>

            <q-item-section side top> 1 min ago </q-item-section>
          </q-item>
          <q-separator spaced inset="item" />
        </div>
      </q-list>
    </div>

    <q-dialog v-model="prompt">
      <q-card style="min-width: 350px">
        <q-card-section>
          <div class="text-h6">Enter a username</div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          <q-input
            dense
            v-model="username"
            autofocus
            @keyup.enter="confirmAdd"
          />
        </q-card-section>

        <q-card-actions align="right" class="buttons-group text-primary">
          <q-btn
            class="btn"
            color="red"
            rounded
            label="Cancel"
            v-close-popup
            @click="cancelAdd"
          />
          <q-btn
            class="btn"
            color="primary"
            rounded
            label="Add user"
            v-close-popup
            @click="confirmAdd"
          />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { ref } from "vue";
import { useQuasar } from "quasar";

export default defineComponent({
  setup() {
    const $q = useQuasar();
    const username = ref("");
    const prompt = ref(false);
    // const showControls = ref(false);

    function confirmAdd() {
      console.log(username.value);
      prompt.value = false;
      username.value = "";
      $q.notify({
        badgeClass: "alert-badge",
        message: "Friend request has been sent!",
      });
    }

    function cancelAdd() {
      username.value = "";
    }

    return {
      confirmAdd,
      cancelAdd,
      username,
      prompt,
    };
  },
});
</script>

<style scoped>
.call {
  font-size: 25px;
  padding: 6px;
}
.btn {
  width: 125px;
}
.buttons-group {
  margin: 8px;
}
.alert-badge {
  color: pink;
  background: white;
  width: 100% !important;
  height: 100% !important;
}
.q-icon {
  font-size: 18px;
}

.search-bar-container {
  width: 90%;
  margin: auto;
  padding: 14px 0;
}

.show-controls {
  background-color: white;
}
</style>