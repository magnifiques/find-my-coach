import { createRouter, createWebHistory } from "vue-router";

import Coaches from "./pages/coaches/Coaches.vue";

import Request from "./pages/request/Request.vue";

import Auth from "./pages/auth/Auth.vue";

import NotFound from "./pages/NotFound.vue";

import store from "./store/index.js";

const CoachDetails = () => import("./pages/coaches/CoachDetails.vue");
const Register = () => import("./pages/coaches/Register.vue");
const CoachContact = () => import("./pages/request/CoachContact.vue");

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: "/", redirect: "/coaches" },
    { path: "/coaches", component: Coaches },
    {
      path: "/coaches/:id",
      component: CoachDetails,
      props: true,
      children: [{ path: "contact", component: CoachContact }],
    },
    { path: "/register", component: Register, meta: { requiresAuth: true } },
    { path: "/requests", component: Request, meta: { requiresAuth: true } },
    { path: "/auth", component: Auth, meta: { requiresUnAuth: true } },
    { path: "/:notFound(.*)", component: NotFound },
  ],
});

router.beforeEach(function (to, _, next) {
  if (to.meta.requiresAuth && !store.getters.isAuthenticated) {
    next("/auth");
  } else if (to.meta.requiresUnAuth && store.getters.isAuthenticated) {
    next("/coaches");
  } else {
    next();
  }
});

export default router;
