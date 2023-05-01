<template>
  <v-container class="d-flex justify-center align-center h-screen">
    <v-form v-model="valid">
      <v-row>
        <v-col>
          <div class="text-h3">Welcome Back</div>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <v-text-field
            v-model="email"
            type="text"
            label="Email adress"
            color="primary"
            style="width: 100%"
          />

          <v-text-field
            v-model="password"
            type="password"
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
