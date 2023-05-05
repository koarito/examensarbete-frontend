<template>
  <v-container class="d-flex justify-center align-center h-screen">
    <v-form v-model="valid" @submit="" class="w-25">
      <v-row>
        <v-col>
          <div class="text-h4 text-center">Team Collaboration Tool</div>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <v-text-field
            v-model="loginCreds.email"
            type="text"
            label="Email adress"
            color="primary"
            bg-color="secondary"
            style="width: 100%"
          />

          <v-text-field
            v-model="loginCreds.password"
            type="password"
            bg-color="secondary"
            label="Password"
            color="primary"
          />
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <div class="d-flex justify-center">
            <v-btn size="large" color="secondary" @click="login">Login</v-btn>
          </div>
        </v-col>
      </v-row>
      <v-row>
        <v-col align-self="center">
          <p class="text-center">Dont have an account?</p>
          <div class="d-flex justify-center">
            <v-btn to="/signup" color="primary">Signup</v-btn>
          </div>
        </v-col>
      </v-row>
    </v-form>
  </v-container>
</template>
<script>
import { ref, reactive } from "vue";
import { useAuthStore } from "../stores/Auth";

export default {
  setup() {
    const valid = ref(false);
    const loginCreds = reactive({ email: "", password: "" });
    const authStore = useAuthStore();
    async function login() {
      await authStore.login(loginCreds);
    }

    return { valid, loginCreds, authStore, login };
  },
};
</script>
