<template>
  <div class="container">
    <div bordered class="header text-white">
      <div class="profile-info">
        <q-avatar size="120px">
          <img src="https://cdn.quasar.dev/img/avatar.png" />
        </q-avatar>
        <div class="user">
          <div class="nickname">{{user.username}}</div>
          <div class="username">{{user.userId}}</div>
        </div>
      </div>
    </div>

    <div class="content q-mt-md q-mx-lg">
      <q-card class="q-mx-auto">
        <q-list dark dense>
          <q-item clickable v-ripple>
            <q-item-section avatar>
              <q-avatar
                rounded
                color="blue"
                text-color="white"
                icon="fas fa-at"
              />
            </q-item-section>
            <q-item-section>Edit Profile</q-item-section>
            <q-item-section side>
              <q-icon name="fas fa-angle-right" class="side" />
            </q-item-section>
          </q-item>
          <!-- <q-separator inset="item" /> -->
        </q-list>
      </q-card>

      <q-card class="q-mx-auto q-my-md">
        <q-list dark dense>
          <q-item clickable v-ripple>
            <q-item-section avatar>
              <q-avatar
                rounded
                color="purple"
                text-color="white"
                icon="fas fa-share"
              />
            </q-item-section>
            <q-item-section>Invite a friend</q-item-section>
            <q-item-section side>
              <q-icon name="fas fa-angle-right" class="side" />
            </q-item-section>
          </q-item>
          <q-separator inset="item" />
          <q-item clickable v-ripple>
            <q-item-section avatar>
              <q-avatar
                rounded
                color="green"
                text-color="white"
                icon="fas fa-bell"
              />
            </q-item-section>
            <q-item-section>Notifications</q-item-section>
            <q-item-section side>
              <q-icon name="fas fa-angle-right" class="side" />
            </q-item-section>
          </q-item>
        </q-list>
      </q-card>

      <q-card class="q-mx-auto q-my-md">
        <q-list dark dense>
          <q-item clickable v-ripple>
            <q-item-section avatar>
              <q-avatar
                rounded
                color="red"
                text-color="white"
                icon="fas fa-sign-out-alt"
              />
            </q-item-section>
            <q-item-section @click="logout">Logout</q-item-section>
          </q-item>
        </q-list>
      </q-card>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from "vue";
import { useStore } from "../store/store";
import { useRouter } from "vue-router";

export default defineComponent({
  name: "SettingsPage",
  setup() {
    const store = useStore();
    const router = useRouter();

    const user = computed(() => store.getters["auth/user"]);

    function logout() {
      store.dispatch("auth/logout");
      router.replace("/auth");
    }

    return {
      logout,
      user
    };
  },
});
</script>


<style scoped>
.header .profile-info {
  margin: 1em 0;
  text-align: center;
}
.header .user {
  margin-top: 0.36em;
}
.header .nickname {
  font-size: 28px;
  font-weight: 700;
}
.header .username {
  color: darkgray;
}
.content {
  font-size: 13px;
}
.content .q-avatar {
  margin: 0.3rem 0 !important;
  padding: 0 !important;
  font-size: 28px !important;
}

.content .side {
  font-weight: 600;
  font-size: 14px;
}
</style>