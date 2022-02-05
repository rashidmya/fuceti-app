<template>
  <div>
    <Login v-if="form === 0" />
    <Register v-else />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import Login from "../components/auth/Login.vue";
import Register from "../components/auth/Register.vue";

enum FormMode {
  Login = 0,
  Register = 1,
}

export default defineComponent({
  name: "User Authentication",
  components: {
    Login,
    Register,
  },
  setup() {
    const form = ref(FormMode.Login);

    function changeForm(){
      if (form.value === FormMode.Register){
        form.value = FormMode.Login
      } else {
        form.value = FormMode.Register
      }
    }

    return {
      changeForm
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