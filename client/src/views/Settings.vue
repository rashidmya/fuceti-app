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

    <div class="content q-mt-md full-width">
      <q-card class="q-mx-auto">
        <q-list dark dense>
          <q-item clickable v-ripple>
            <q-item-section avatar>
              <q-avatar
                rounded
                color="blue"
                text-color="white"
                icon="fas fa-signature"
              />
            </q-item-section>
            <q-item-section>Edit Profile</q-item-section>
             <q-item-section side>
               <q-icon name="fas fa-angle-right" class="side"/>
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
                color="green"
                text-color="white"
                icon="fas fa-bell"
              />
            </q-item-section>
            <q-item-section>Notifications</q-item-section>
                         <q-item-section side>
               <q-icon name="fas fa-angle-right" class="side"/>
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
  font-size: 28px;
  font-weight: 700;
}
.q-header .username {
  color: darkgray;
}
.content {
  font-size: 13px;
}
.content .q-avatar {
  margin: 0.3000rem 0 !important;
  padding: 0 !important;
  font-size: 28px !important;
}

.content .side {
  font-weight: 600;
  font-size: 14px;
}
</style>