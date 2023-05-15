<template>
  <v-form @submit.stop.prevent="handleSubmit"> </v-form>
  <div class="padding">
    <v-sheet elevation="10" rounded class="wi">
      <v-container
        class="d-flex wi justify-space-between flex-column align-center"
      >
        <v-row>
          <v-col>
            <div class="text-h3 text-center">Sign Up</div>
          </v-col>
        </v-row>
        <v-row class="w-50">
          <v-col>
            <v-text-field
              type="text"
              color="primary"
              label="Email"
              v-model="values.email"
            />
          </v-col>
        </v-row>

        <v-row class="w-50">
          <v-col>
            <v-text-field
              color="primary"
              label="Password"
              :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
              :type="showPassword ? 'text' : 'password'"
              hint="Minimum 8 characters"
              @click:append="showPassword = !showPassword"
              v-model="values.password"
            />
          </v-col>
        </v-row>
        <v-row class="w-50">
          <v-col>
            <v-text-field
              color="primary"
              label="Confirm password"
              :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
              :type="showPassword ? 'text' : 'password'"
              hint="Minimum 8 characters"
              @click:append="showPassword = !showPassword"
              v-model="values.passwordConf"
            />
          </v-col>
        </v-row>
      </v-container>
    </v-sheet>
  </div>
</template>
<script>
import { reactive, ref } from "vue";

export default {
  setup() {
    const showPassword = ref(false);
    const values = reactive({
      email: "",
      password: "",
      passwordConf: "",
    });
    return { values, showPassword };
  },
};
</script>
<style>
.padding {
  padding-top: 10rem;
}
.wi {
  width: 90%;
  margin: auto;
}
</style>
