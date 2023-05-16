<template>
  <v-form @submit.stop.prevent="handleSubmit">
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
                type="text"
                color="primary"
                label="First name"
                v-model="values.firstName"
              />
            </v-col>
          </v-row>
          <v-row class="w-50">
            <v-col>
              <v-text-field
                type="text"
                color="primary"
                label="Last name"
                v-model="values.lastName"
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
                aria-required="true"
                :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                :type="showPassword ? 'text' : 'password'"
                hint="Minimum 8 characters"
                @click:append="showPassword = !showPassword"
                v-model="values.passwordConf"
              />
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <v-btn type="submit" color="primary">Create account</v-btn>
            </v-col>
          </v-row>
        </v-container>
      </v-sheet>
    </div>
  </v-form>
</template>
<script>
import { reactive, ref } from "vue";
import axios from "axios";
import router from "@/router";

export default {
  setup() {
    const showPassword = ref(false);
    const values = reactive({
      email: "",
      firstName: "",
      lastName: "",
      password: "",
      passwordConf: "",
      role: "USER",
    });
    async function handleSubmit() {
      await axios
        .post("http://localhost:8080/api/auth/signup", values)
        .then(router.push("/"))
        .catch((error) => {
          if (error.response) {
            console.log("Data :", error.response.data);
            console.log("Status :" + error.response.status);
          } else if (error.request) {
            console.log(error.request);
          } else {
            console.log("Error", error.message);
          }
        });
    }
    return { values, showPassword, handleSubmit };
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
