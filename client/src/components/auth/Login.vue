<template>
  <div class="container absolute-center">
    <div class="header row">
      <h4 class="inline q-mx-auto q-mt-xs">Login</h4>
    </div>
    <q-form @submit.prevent="login">
      <q-input
        v-model="username"
        label="Username"
        lazy-rules
        :rules="[(val) => (val && val.length > 0) || 'Please type something']"
      />

      <q-input
        v-model="password"
        label="Password"
        :type="isPwd ? 'password' : 'text'"
        lazy-rules
        :rules="[(val) => (val && val.length > 0) || 'Please type something']"
      >
        <template v-slot:append>
          <q-icon
            :name="isPwd ? 'visibility_off' : 'visibility'"
            class="cursor-pointer"
            @click="isPwd = !isPwd"
          />
        </template>
      </q-input>

      <div class="actions">
        <q-btn label="Login" type="submit" color="primary" class="full-width" />
      </div>
    </q-form>
    <p>
      Don't have an account yet?
      <q-btn flat color="warning" @click="$emit('changeAuthMode')"
        >Register</q-btn
      >
    </p>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";

export default defineComponent({
  name: "Login",
  emits: ["changeAuthMode", 'login'],
  setup(_, {emit}) {
    const username = ref("");
    const password = ref("");
    const isPwd = ref(true);

    function login(){
      const user = {
        username: username.value,
        password: password.value
      }
      emit('login', user)
    }

    return {
      username,
      password,
      isPwd,
      login
    };
  },
});
</script>

<style scoped>
.container {
  margin: auto;
  max-width: 80vw;
  width: 100%;
}
.actions {
  margin: 3vh 0 0 0;
}
p {
  margin-top: 13px;
}
</style>