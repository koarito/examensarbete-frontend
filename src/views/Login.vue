<template>
  <v-form v-model="valid" @submit.stop.prevent="handleSubmit">
    <div class="d-flex h-screen">
      <v-sheet elevation="10" rounded class="wi">
        <v-container
          class="d-flex wi justify-space-between flex-column align-center"
        >
          <v-row>
            <v-col>
              <div class="text-h4 text-center">Team Collaboration Tool</div>
            </v-col>
          </v-row>
          <v-row class="w-50">
            <v-col>
              <v-text-field
                v-model="loginCreds.email"
                type="text"
                label="Email adress"
                color="primary"
                bg-color="secondary"
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
          <v-row class="w-50">
            <v-col>
              <div class="d-flex justify-center">
                <v-btn size="large" color="secondary" type="submit"
                  >Login</v-btn
                >
              </div>
            </v-col>
          </v-row>
          <v-row>
            <v-col align-self="center">
              <p class="text-center text-overline font-weight-bold">
                Dont have an account?
              </p>
              <div class="d-flex justify-center">
                <v-btn to="/signup" size="large" color="primary">Signup</v-btn>
              </div>
            </v-col>
          </v-row>
        </v-container>
      </v-sheet>
    </div>
  </v-form>
</template>
<script>
import { ref, reactive } from "vue";
import { useAuthStore } from "../stores/Auth";

export default {
  setup() {
    const valid = ref(false);
    const loginCreds = reactive({ email: "", password: "" });
    const authStore = useAuthStore();
    function handleSubmit() {
      authStore.login(loginCreds);
    }

    return { valid, loginCreds, authStore, handleSubmit };
  },
};
</script>
<style>
.wi {
  width: 75%;
  margin: auto;
}
.padding {
  padding-top: 10rem;
}
</style>
