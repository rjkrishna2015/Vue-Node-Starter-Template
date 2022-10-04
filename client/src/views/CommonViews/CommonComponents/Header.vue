<template>
  <div>
    <v-app-bar color="deep-purple accent-4" dense dark>
      <v-app-bar-nav-icon
        @click.stop="drawer = !drawer"
        v-if="isUserLoggedIn"
      ></v-app-bar-nav-icon>

      <v-toolbar-title>{{ navTitle }}</v-toolbar-title>
      <div v-if="isDebugOn">
        <v-spacer></v-spacer>
        <v-chip class="ma-2" right color="red" text-color="white">
          {{ tData.debugOnText }}
        </v-chip>
      </div>

      <v-spacer></v-spacer>
      <div v-if="isUserLoggedIn">
        <router-link
          :to="userData.USER_TYPE === 'U' ? '/dashboard' : '/admindashboard'"
          exact
          class="noHrefDec"
        >
          <v-tooltip bottom>
            <template v-slot:activator="{ on, attrs }">
              <v-btn v-bind="attrs" v-on="on" icon>
                <v-icon>{{ tData.homeIcon }}</v-icon>
              </v-btn>
            </template>

            <span>{{ tData.homeTooltip }}</span>
          </v-tooltip>
        </router-link>

        <v-tooltip bottom>
          <template v-slot:activator="{ on, attrs }">
            <v-btn v-bind="attrs" v-on="on" icon @click="logoutUser">
              <v-icon>{{ tData.logoutIcon }}</v-icon>
            </v-btn>
          </template>
          <span>{{ tData.logoutTooltip }}</span>
        </v-tooltip>
      </div>
    </v-app-bar>
    <div v-if="isUserLoggedIn">
      <v-navigation-drawer v-model="drawer" absolute temporary>
        <v-list-item>
          <v-list-item-avatar :color="userData.USER_AVATAR_COLOR">
            <span class="white--text text-h5">{{
              userData.USER_DISPLAY_NAME.charAt(0)
            }}</span>
          </v-list-item-avatar>

          <v-list-item-content>
            <v-list-item-title>{{
              userData.USER_DISPLAY_NAME
            }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-divider></v-divider>

        <v-list dense>
          <v-list-item link>
            <router-link
              :to="
                userData.USER_TYPE === 'U' ? '/dashboard' : '/admindashboard'
              "
              class="disableRouterLinkStyle"
            >
              <v-list-item-icon>
                <v-icon>{{ tData.dashboardIcon }}</v-icon>
              </v-list-item-icon>

              <v-list-item-content>
                <v-list-item-title class="listTitleFont">{{
                  tData.dashboardText
                }}</v-list-item-title>
              </v-list-item-content>
            </router-link>
          </v-list-item>
          <v-list-item link>
            <router-link to="/changepassword" class="disableRouterLinkStyle">
              <v-list-item-icon>
                <v-icon>{{ tData.changePasswordIcon }}</v-icon>
              </v-list-item-icon>

              <v-list-item-content>
                <v-list-item-title class="listTitleFont">{{
                  tData.changePasswordText
                }}</v-list-item-title>
              </v-list-item-content>
            </router-link>
          </v-list-item>
        </v-list>
      </v-navigation-drawer>
    </div>
  </div>
</template>

<script>
import * as common from "../../../utils/Common";
const tData = common.templateData.headerComp;
const navTitle = common.templateData.projName;
export default {
  name: "Header",
  data() {
    return {
      drawer: null,
      userData: common.getLoggedUserInfo(),
      userType: common.getLoggedUserInfo("USER_TYPE"),
      isDebugOn: "",
      isUserLoggedIn: common.isUserLogged(),
      tData,
      navTitle,
    };
  },
  methods: {
    logoutUser() {
      common.logoutUserAndClearSession();
    },
  },
  // ---------------------------------------------
  beforeCreate() {
    common.cLog(this.$options.name, "beforeCreate");
    common.setQueryParamsInSession(this.$route.query);
  },
  created() {
    common.cLog(this.$options.name, "created");
  },
  beforeMount() {
    common.cLog(this.$options.name, "beforeMount");
    this.isDebugOn = common.isDebugOn();
  },
  mounted() {
    common.cLog(this.$options.name, "mounted");
  },
  beforeUpdate() {
    common.cLog(this.$options.name, "beforeUpdate");
  },
  updated() {
    common.cLog(this.$options.name, "updated");
  },
  beforeDestroy() {
    common.cLog(this.$options.name, "beforeDestroy");
  },
  destroyed() {
    common.cLog(this.$options.name, "destroyed");
  },
};
</script>
<style scoped>
.disableRouterLinkStyle {
  text-decoration: none !important;
  color: inherit !important;
  display: flex;
}
.listTitleFont {
  font-size: 14px !important;
}
.noHrefDec {
  text-decoration: none !important;
  color: inherit !important;
}
</style>
