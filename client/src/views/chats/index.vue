<template>
  <div class="container">
    <the-header>
      <template #default> Chats </template>
      <template #action>
        <q-icon
          name="fas fa-user-plus"
          @click="addUserDialog = !addUserDialog"
        ></q-icon>
      </template>
    </the-header>

    <div class="chat-list">
      <q-list padding separator>
        <div v-for="r in 15" :key="r" class="">
          <q-item
            clickable
            v-ripple
            dense
            :to="{ name: 'chat', params: { id: r } }"
          >
            <q-item-section avatar>
              <q-avatar>
                <img src="https://cdn.quasar.dev/img/avatar2.jpg" />
                <q-badge color="red" rounded floating>{{ r }}</q-badge>
              </q-avatar>
            </q-item-section>

            <q-item-section>
              <q-item-label lines="1">Emma</q-item-label>
              <q-item-label caption lines="1">
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
    <AddDialog
      @closeDialog="addUserDialog = !addUserDialog"
      :showDialog="addUserDialog"
    ></AddDialog>

     <FindDialog
      @closeDialog="findUserDialog = !findUserDialog"
      :showDialog="findUserDialog"
    ></FindDialog>

    <q-page-sticky position="bottom-right" :offset="[18, 18]">
      <q-btn fab icon="fas fa-pencil-alt" color="blue-6" @click="findUserDialog = !findUserDialog" />
    </q-page-sticky>

  </div>
</template>

<script lang="ts">
import TheHeader from "../../components/layouts/TheHeader.vue";
import FindDialog from "../../components/ui/FindDialog.vue";
import AddDialog from "../../components/ui/AddDialog.vue";
import { defineComponent, ref } from "vue";

export default defineComponent({
  components: {
    TheHeader,
    FindDialog,
    AddDialog
  },
  setup() {
    const addUserDialog = ref(false);
    const findUserDialog = ref(false);

    return {
      addUserDialog,
      findUserDialog
    };
  },
});
</script>
