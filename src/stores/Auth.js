import { defineStore } from "pinia";
import router from "@/router";
import axios from "axios";

export const useAuthStore = defineStore({
  id: "auth",
  state: () => ({
    token: null,
  }),
  persist: true,

  getters: {
    getToken: (state) => state.token,
  },
  actions: {
    async login(loginCreds) {
      await axios
        .post("http://localhost:8080/api/auth/authenticate", loginCreds)
        .then((response) => {
          this.token = response.data.token;
          router.push("/home");
        })
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
    },
    logout() {
      this.token = null;
      router.push("/");
    },
  },
});
