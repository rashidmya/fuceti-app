<template>
  <div class="container absolute-center">
    <div class="header row">
      <h4 class="inline q-mx-auto">Register</h4>
    </div>
    <q-form @submit.prevent="register">
           <q-input
        v-model="email"
        label="Email"
        type="email"
        lazy-rules
        :rules="[(val) => (val && val.length > 0) || 'Please type something']"
      />

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
        <q-btn label="Create Account" type="submit" color="primary" class="full-width" />
      </div>
    </q-form>
    <p>
      Already have an account?
      <q-btn flat color="warning" @click="$emit('changeAuthMode')"
        >Login</q-btn
      >
    </p>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";

export default defineComponent({
  name: "RegisterForm",
  emits: ['changeAuthMode', 'register'],
  setup(_, {emit}) {
    const username = ref("");
    const password = ref("");
    const email = ref("");
    const isPwd = ref(true);

    function register(){
      const user = {
        email: email.value,
        username: username.value,
        password: password.value,
        userType: 'consumer'
      }
      emit('register', user)
    }

    return {
      email,
      username,
      password,
      isPwd,
      register
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
  margin: 10vh 0 0 0;
}
p {
  margin-top: 10px;
}
</style>