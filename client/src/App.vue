<template>
  <v-app>
    <Header v-if="$route.meta.showNavbar !== false" />
    <router-view />
    <Footer v-if="$route.meta.showFooter !== false" />
  </v-app>
</template>

<script>
import Header from "./views/CommonViews/CommonComponents/Header.vue";
import Footer from "./views/CommonViews/CommonComponents/Footer.vue";
export default {
  name: "App",
  components: { Header, Footer },
};
</script>
