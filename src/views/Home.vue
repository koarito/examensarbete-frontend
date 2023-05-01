<template>
  <v-container class="d-flex justify-center align-center h-screen">
    <v-form v-model="valid" class="w-25">
      <v-row>
        <v-col>
          <div class="text-h4 text-center">Team Collaboration Tool</div>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <v-text-field
            v-model="email"
            type="text"
            label="Email adress"
            color="primary"
            bg-color="secondary"
            style="width: 100%"
          />

          <v-text-field
            v-model="password"
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
            <v-btn size="large" color="secondary">Login</v-btn>
          </div>
        </v-col>
      </v-row>
      <v-row>
        <v-col align-self="center">
          <p class="text-center">Dont have an account?</p>
          <div class="d-flex justify-center">
            <v-btn color="primary">Signup</v-btn>
          </div>
        </v-col>
      </v-row>
    </v-form>
  </v-container>
</template>
<script>
import { ref } from "vue";
export default {
  setup() {
    const valid = ref(false);
    const email = ref("");
    const password = ref("");
    return { valid, password, email };
  },
};
</script>
<style lang=""></style>
