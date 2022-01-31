<template>
  <div class="container">
    <q-header bordered class="bg-dark text-white q-pa-xs">
      <q-toolbar>
        <q-toolbar-title class="text-center"> Friends </q-toolbar-title>
        <div>
          <q-icon name="fas fa-plus" @click="prompt = !prompt" />
        </div>
      </q-toolbar>
    </q-header>

    <div class="content">
      <div class="search-bar-container">
        <q-input class="search-bar" dense dark standout v-model="searchInput" label="Search">
          <template v-slot:append v-if="searchInput.length > 0">
            <q-icon
              name="close"
              @click="searchInput = ''"
              class="cursor-pointer"
            />
          </template>
        </q-input>
      </div>
      <div class="friends-list">
        <q-list dark separator>
          <q-item clickable v-ripple v-for="x in 16" :key="x">
            <q-item-section avatar>
              <q-avatar>
                <img src="https://cdn.quasar.dev/img/avatar4.jpg" />
              </q-avatar>
            </q-item-section>
            <q-item-section>
              <q-item-label>Davion - {{ x }}</q-item-label>
              <q-item-label caption>last seen 10 minutes ago</q-item-label>
            </q-item-section>
          </q-item>
        </q-list>
      </div>
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
import { defineComponent, ref } from 'vue'
import { useQuasar } from "quasar";
export default defineComponent({
  setup() {
    const $q = useQuasar();
    const username = ref("");
    const prompt = ref(false);
    const searchInput = ref("");
    const showSearchBar = ref(true);

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
      searchInput,
      showSearchBar,
    };
  },
});
</script>

<style scoped>
.search-bar-container {
  margin: 0;
  padding: 0;
  transform: translateY(0);
  opacity: 1;
  transition: 0.2s all ease-out;
}

.search-bar{
  padding: 10px;
}

</style>