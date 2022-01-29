<template>
  <div class="container">
    <q-header bordered reveal class="bg-dark text-white q-pa-xs">
      <q-toolbar>
        <q-toolbar-title class="text-center">
          Chats
        </q-toolbar-title>
      </q-toolbar>
    </q-header>

    <div class="content">
      <q-list>
        <div v-for="r in 15" :key="r" class="">
          <q-item>
            <q-item-section top avatar>
              <q-avatar color="dark" text-color="white" icon="person" />
            </q-item-section>

            <q-item-section>
              <q-item-label>Rashid</q-item-label>
              <q-item-label caption lines="1"
                >Sup bro where are u?</q-item-label
              >
            </q-item-section>

            <q-item-section side>
              <q-item-label>2:40 AM</q-item-label>
            </q-item-section>
          </q-item>
          <q-separator spaced inset="item" />
        </div>
      </q-list>
    </div>

    <q-page-sticky position="bottom-right" :offset="[18, 18]">
      <q-btn fab color="grey-10" @click="prompt = !prompt">
        <q-icon name="fas fa-edit" />
      </q-btn>
    </q-page-sticky>

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
    };
  },
};
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

</style>