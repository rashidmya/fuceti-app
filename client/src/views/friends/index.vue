<template>
  <div class="container">
    <the-header>
      <template #default> Friends </template>
      <template #action>
        <q-icon
          name="fas fa-user-plus"
          @click="addUserDialog = !addUserDialog"
        ></q-icon>
      </template>
    </the-header>

    <div class="content">
      <div class="search-bar-container">
        <q-input
          class="search-bar"
          dense
          dark
          standout
          v-model="searchInput"
          label="Search"
        >
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
    <FindDialog
      @closeDialog="addUserDialog = !addUserDialog"
      :showDialog="addUserDialog"
    ></FindDialog>
  </div>
</template>


<script lang="ts">
import TheHeader from "../../components/layouts/TheHeader.vue";
import FindDialog from "../../components/ui/FindDialog.vue";
import { defineComponent, ref } from "vue";

export default defineComponent({
  components: {
    TheHeader,
    FindDialog,
  },
  setup() {
    const addUserDialog = ref(false);
    const searchInput = ref("");
    const showSearchBar = ref(true);


    return {
      addUserDialog,
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

.search-bar {
  padding: 10px;
}
</style>