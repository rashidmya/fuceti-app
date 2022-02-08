<template>
  <div>
    <LoginForm
      v-if="form === 0"
      @changeAuthMode="changeForm"
      @login="login"
    ></LoginForm>
    <RegisterForm
      v-else
      @changeAuthMode="changeForm"
      @register="register"
    ></RegisterForm>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import LoginForm from "../components/auth/LoginForm.vue";
import RegisterForm from "../components/auth/RegisterForm.vue";
import { useStore } from "vuex";
import { key } from "../store";

enum FormMode {
  Login = 0,
  Register = 1
}

interface SignUp {
  email: string;
  password: string;
  username: string;
}

interface SignIn {
  username: string;
  password: string;
}

export default defineComponent({
  name: "Auth",
  components: {
    LoginForm,
    RegisterForm,
  },
  setup() {
    const store = useStore(key);
    const form = ref(FormMode.Login);

    function changeForm() {
      if (form.value === FormMode.Register) {
        form.value = FormMode.Login;
      } else {
        form.value = FormMode.Register;
      }
    }

    async function register(data: SignUp) {
      await store.dispatch("register", data);
    }
    
    function login(data: SignIn) {
      store.dispatch("login", data);
    }

    return {
      form,
      changeForm,
      register,
      login,
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