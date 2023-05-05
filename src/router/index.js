// Composables
import { createRouter, createWebHistory } from "vue-router";
import Login from "../views/Login.vue";
import Signup from "../views/Signup.vue";
import Home from "../views/Home.vue";
import { useAuthStore } from "@/stores/Auth";

const routes = [
  {
    path: "/",
    component: Login,
    meta: { auth: false },
  },
  {
    path: "/signup",
    component: Signup,
    meta: { auth: false },
  },
  {
    path: "/home",
    component: Home,
    meta: { auth: true },
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach((to, from, next) => {
  if (to.meta.auth && useAuthStore().getToken == null) {
    next("/");
  } else if (!to.meta.auth && useAuthStore().getToken) {
    next("/home");
  } else {
    next();
  }
});

export default router;
