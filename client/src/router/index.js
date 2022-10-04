import Vue from "vue";
import VueRouter from "vue-router";
// AUTHENTICATIONVIEWS IMPORT
import LoginHome from "../views/AuthenticationViews/LoginHome.vue";
// VIEWS
import AdminDashboardVue from "../views/AdminViews/AdminDashboard.vue";
import UserDashboardVue from "../views/UserViews/UserDashboard.vue";
import ChangePasswordVue from "../views/CommonViews/ChangePassword.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "LoginHome",
    component: LoginHome,
    meta: {
      showNavbar: false,
      showFooter: false,
    },
  },
  {
    path: "/dashboard",
    name: "UserDashboard",
    component: UserDashboardVue,
  },
  {
    path: "/admindashboard",
    name: "AdminDashboard",
    component: AdminDashboardVue,
  },
  {
    path: "/changepassword",
    name: "ChangePassword",
    component: ChangePasswordVue,
  },
];
const router = new VueRouter({
  routes,
  mode: "history",
});

//! Executes before going to each route
router.beforeEach((to, from, next) => {
  var isAuthenticated = false;
  if (sessionStorage.getItem("user_token")) {
    isAuthenticated = true;
  }
  if (isAuthenticated) {
    if (to.name === "LoginHome") {
      if (JSON.parse(sessionStorage.getItem("user_data")).USER_TYPE === "U") {
        next({ name: "UserDashboard" });
      } else {
        next({ name: "AdminDashboard" });
      }
    } else {
      next();
    }
  }
  if (to.name !== "LoginHome" && !isAuthenticated) {
    next({ name: "LoginHome" });
  } else {
    next();
  }
});
export default router;
