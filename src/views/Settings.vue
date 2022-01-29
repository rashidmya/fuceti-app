<template>
  <div class="container">
    <q-header bordered class="bg-dark text-white">
      <div class="profile-info">
        <q-avatar size="120px">
          <img src="https://cdn.quasar.dev/img/avatar.png" />
        </q-avatar>
        <div class="user">
          <div class="nickname">Buga</div>
          <div class="username">bugavicious</div>
        </div>
      </div>
    </q-header>

    <div class="content q-mt-md">
      <q-card style="max-width: 318px" class="q-mx-auto">
        <q-list dark separator>
          <q-item clickable v-ripple>
            <q-item-section avatar>
              <q-avatar
                rounded
                color="purple"
                text-color="white"
                icon="fas fa-signature"
              />
            </q-item-section>
            <q-item-section>Change Display Name</q-item-section>
          </q-item>
          <q-item clickable v-ripple>
            <q-item-section avatar>
              <q-avatar
                rounded
                color="green"
                text-color="white"
                icon="fas fa-camera-retro"
              />
            </q-item-section>
            <q-item-section>Change Avatar</q-item-section>
          </q-item>
        </q-list>
      </q-card>

      <q-card style="max-width: 318px" class="q-mx-auto q-my-md">
        <q-list dark separator>
          <q-item clickable v-ripple>
            <q-item-section avatar>
              <q-avatar
                rounded
                color="red"
                text-color="white"
                icon="fas fa-sign-out-alt"
              />
            </q-item-section>
            <q-item-section>Logout</q-item-section>
          </q-item>
        </q-list>
      </q-card>
    </div>
  </div>
</template>

<style scoped>
.q-header .profile-info {
  margin: 1em 0;
  text-align: center;
}

.q-header .user {
  margin-top: 0.36em;
}

.q-header .nickname {
  font-size: 25px;
  font-weight: 700;
}

.q-header .username {
  color: darkgray;
}

.content {
  font-size: 11px;
}

.content .q-avatar {
  font-size: 22px !important;
}

</style>