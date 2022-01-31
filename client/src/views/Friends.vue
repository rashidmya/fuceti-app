<template>
  <div class="container">
    <q-header bordered class="bg-dark text-white q-pa-xs">
      <q-toolbar>
        <q-toolbar-title class="text-center"> Friends </q-toolbar-title>
        <div>
          <q-icon name="fas fa-plus" @click="prompt = !prompt" />
        </div>
      </q-toolbar>
      <div class="search-bar-container">
        <q-input
          dense
          dark
          standout
          v-model="text"
          label="Search"
        >
          <template v-slot:append v-if="text.length > 0">
            <q-icon name="close" @click="text = ''" class="cursor-pointer" />
          </template>
        </q-input>
      </div>
    </q-header>

    <div class="content">
      <q-list dark separator>
        <q-item clickable v-ripple v-for="x in 16" :key="x">
          <q-item-section avatar>
            <q-avatar>
              <img src="https://cdn.quasar.dev/img/avatar4.jpg" />
            </q-avatar>
          </q-item-section>
          <q-item-section>
            <q-item-label>Davion</q-item-label>
            <q-item-label caption>last seen 10 minutes ago</q-item-label>
          </q-item-section>
        </q-item>
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


<script>
import { ref } from "vue";
import { useQuasar } from "quasar";
export default {
  setup() {
    const $q = useQuasar();
    const username = ref("");
    const prompt = ref(false);
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
      text: ref("")
    };
  },
};
</script>

<style scoped>
.search-bar-container {
  width: 90%;
  margin: auto;
  padding: 14px 0;
}
</style>