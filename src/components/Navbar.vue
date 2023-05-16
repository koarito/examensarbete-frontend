<template>
  <v-app-bar color="primary" title="Team Collaboration Tool"
    ><v-btn
      v-if="authenticated"
      class="navButton"
      size="large"
      :border="true"
      @click="navigate('home')"
      >Home</v-btn
    >
    <v-btn
      v-if="authenticated"
      class="navButton"
      size="large"
      append-icon="mdi-logout"
      :border="true"
      @click="navigate('logout')"
      >Logout</v-btn
    >
    <v-btn
      v-else
      class="navButton"
      size="large"
      append-icon="mdi-login"
      :border="true"
      @click="navigate('login')"
      >Login</v-btn
    >
  </v-app-bar>
</template>
<script setup>
import { useAuthStore } from "@/stores/Auth";
import { ref } from "vue";
import router from "@/router";

const authenticated = ref(useAuthStore().getToken);
function navigate(route) {
  if (route == "login") {
    router.push("/");
  } else if (route == "home") {
    router.push("/home");
  } else {
    useAuthStore().logout();
  }
}
</script>
<style>
.navButton {
  background-color: #e94f7c;
}
</style>
