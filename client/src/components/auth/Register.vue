<template>
  <div class="container absolute-center">
    <div class="header row">
      <h4 class="inline q-mx-auto">Register</h4>
    </div>
    <q-form>
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
      Already have an account? <a>Login</a>
    </p>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";


export default defineComponent({
  name: "Register",
  setup() {
    const username = ref("");
    const password = ref("");
    const isPwd = ref(true);
    
    return {
      username,
      password,
      isPwd
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