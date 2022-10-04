<template>
  <v-container fluid>
    <v-form
      @submit.prevent="login"
      ref="login_form"
      v-model="login_valid"
      lazy-validation
    >
      <v-text-field
        v-model="login_name"
        :counter="15"
        :rules="login_nameRules"
        :label="tData.username.label"
        required
        outlined
        :prepend-inner-icon="tData.username.icon"
        autocomplete="on"
      ></v-text-field>

      <v-text-field
        v-model="login_password"
        :counter="15"
        :rules="login_passRules"
        :label="tData.password.label"
        required
        outlined
        :prepend-inner-icon="tData.password.icon"
        :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
        :type="showPassword ? 'text' : 'password'"
        @click:append="showPassword = !showPassword"
        autocomplete="on"
      ></v-text-field>
      <v-container class="forgotPasswordContainer">
        <v-btn color="info" dark type="submit">
          <v-icon left dark> mdi-login </v-icon>{{ tData.btnText }}
        </v-btn>
        <span class="forgotPassword" @click="showForgotPassModal">{{
          tData.forgotPassText
        }}</span>
      </v-container>
    </v-form>
  </v-container>
</template>

<script>
import * as common from "../../utils/Common";
const tData = common.templateData.signIn;
const config = common.config;
export default {
  name: "Login",
  data: () => ({
    loading: false,
    showPassword: false,
    login_valid: true,
    login_name: "",
    login_password: "",
    login_nameRules: [
      (v) => !!v || tData.username.emptyErr,
      (v) => (v && v.length <= 15) || tData.username.exceedErr,
    ],
    login_passRules: [
      (v) => !!v || tData.password.emptyErr,
      (v) => (v && v.length <= 15) || tData.password.exceedErr,
    ],
    tData,
  }),
  methods: {
    async login() {
      try {
        if (this.$refs.login_form.validate() === false) {
          setTimeout(() => {
            this.resetLoginFormValidation();
          }, 3000);
          return;
        }

        this.loading = true;
        const formData = {
          USER_NAME: this.login_name,
          USER_PASS: this.login_password,
        };
        common
          .fetchAPIData(config.SIGIN_API, formData, "POST")
          .then((json) => {
            if (json.status === "Success") {
              sessionStorage.setItem("user_token", json.userData.USER_TOKEN);
              sessionStorage.setItem(
                "user_data",
                JSON.stringify(json.userData)
              );
              this.redirectToDesiredUI(json.userData.USER_TYPE);
            } else {
              this.$emit("showSigInErrorSnack", json.message);
            }
          })
          .catch((err) => {
            console.log(err);
          });
      } catch (err) {
        console.log(err);
      }
    },
    resetLoginFormValidation() {
      this.$refs.login_form.resetValidation();
    },
    showForgotPassModal() {
      this.$emit("showForgotPasswordDialog");
    },
    redirectToDesiredUI(userType) {
      if (userType === "U") {
        this.$router.push({
          name: "UserDashboard",
        });
      } else {
        this.$router.push({
          name: "AdminDashboard",
        });
      }
    },
  },
  beforeCreate() {
    common.cLog(this.$options.name, "beforeCreate");
  },
  created() {
    common.cLog(this.$options.name, "created");
  },
  beforeMount() {
    common.cLog(this.$options.name, "beforeMount");
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
.forgotPasswordContainer {
  padding: 0px !important;
  display: inline-flex;
  justify-content: space-between;
  vertical-align: middle;
}
.forgotPassword {
  font-size: 14px;
  font-weight: bold;
  text-decoration: underline;
  cursor: pointer;
  margin-top: 10px;
}
</style>
