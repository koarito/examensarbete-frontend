// Composables
import { createRouter, createWebHistory } from "vue-router";
import Login from "../views/Login.vue";
import Signup from "../views/Signup.vue";
import Home from "../views/Home.vue";
import CreateReview from "../views/CreateReview.vue";
import EditReview from "../views/EditReview.vue";
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
  {
    path: "/create/review",
    component: CreateReview,
    meta: { auth: true },
  },
  {
    path: "/edit/review/:reviewId",
    component: EditReview,
    meta: { auth: true },
    props: true,
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
