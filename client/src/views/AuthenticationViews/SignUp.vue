<template>
  <v-stepper v-model="stepNum" vertical>
    <v-stepper-step :complete="stepNum > 1" step="1">
      {{ tData.step1.title }}
    </v-stepper-step>

    <v-stepper-content step="1">
      <v-form
        ref="credentialForm_valid"
        v-model="credentialForm_valid"
        lazy-validation
      >
        <v-text-field
          v-model="signup_name"
          :counter="15"
          :rules="signup_nameRules"
          :label="tData.step1.username.label"
          required
          outlined
          :prepend-inner-icon="tData.step1.username.icon"
          style="margin-top: 5px"
        ></v-text-field>
        <div
          v-if="showUsernameError === true"
          style="margin-bottom: 12px; margin-top: -12px; margin-left: 12px"
        >
          <span class="errorMsg">{{ showUsernameMsg }}</span>
          <br />
        </div>

        <v-text-field
          v-model="signup_dpName"
          :counter="15"
          :rules="signup_dpNameRules"
          :label="tData.step1.displayName.label"
          required
          outlined
          :prepend-inner-icon="tData.step1.displayName.icon"
        ></v-text-field>

        <v-text-field
          v-model="signup_email"
          :rules="signup_emailRules"
          :label="tData.step1.email.label"
          required
          outlined
          type="email"
          :prepend-inner-icon="tData.step1.email.icon"
        ></v-text-field>
        <v-btn color="primary" @click="sendTempPassToUser">
          {{ tData.step1.btnText }}
        </v-btn>
      </v-form>
    </v-stepper-content>

    <v-stepper-step :complete="stepNum > 2" step="2">
      {{ signUpEmailMsg }}
    </v-stepper-step>

    <v-stepper-content step="2">
      <v-card
        color="grey lighten-1"
        class="mb-12"
        height="200px"
        style="display: flex; justify-content: center; align-items: center"
      >
        <div v-if="signUpEmailStatus === 'Success'">
          <v-avatar color="success" size="80">
            <v-icon dark size="55"> mdi-check </v-icon>
          </v-avatar>
        </div>
        <div v-if="signUpEmailStatus === 'Failed'">
          <v-avatar color="error" size="80">
            <v-icon dark size="55"> mdi-alert </v-icon>
          </v-avatar>
        </div>
      </v-card>
      <v-btn color="primary" @click="stepNum = 3"> Ok </v-btn>
    </v-stepper-content>

    <v-stepper-step :complete="stepNum > 3" step="3">
      Enter the Temporary password
    </v-stepper-step>

    <v-stepper-content step="3">
      <v-form
        ref="passwordForm_valid"
        v-model="passwordForm_valid"
        lazy-validation
      >
        <v-text-field
          v-model="signup_password"
          :counter="15"
          :rules="signup_passRules"
          :label="tData.step3.password.label"
          required
          outlined
          :prepend-inner-icon="tData.step3.password.icon"
          :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
          :type="showPassword ? 'text' : 'password'"
          autocomplete="on"
          @click:append="showPassword = !showPassword"
          style="margin-top: 5px"
        ></v-text-field>
        <div v-if="showPassError === true">
          <span class="errorMsg">{{ showPassMsg }}</span>
          <br />
        </div>
        <v-btn color="primary" @click="checkPasswordOfUser">
          {{ tData.step3.btnText }}
        </v-btn>
      </v-form>
    </v-stepper-content>

    <v-stepper-step step="4"> {{ passFormMsg }} </v-stepper-step>
    <v-stepper-content step="4">
      <v-card
        color="grey lighten-1"
        class="mb-12"
        height="200px"
        style="display: flex; justify-content: center; align-items: center"
      >
        <div v-if="passFormStatus === 'Success'">
          <v-avatar color="success" size="80">
            <v-icon dark size="55"> mdi-check </v-icon>
          </v-avatar>
        </div>
        <div v-if="passFormStatus === 'Failed'">
          <v-avatar color="error" size="80">
            <v-icon dark size="55"> mdi-alert </v-icon>
          </v-avatar>
        </div>
      </v-card>
      <v-btn color="primary" @click="switchToSignInForm"> SignIn </v-btn>
    </v-stepper-content>
  </v-stepper>
</template>

<script>
import * as common from "../../utils/Common";
const tData = common.templateData.signUp;
const config = common.config;
export default {
  name: "SignUp",
  data: () => ({
    stepNum: 1,
    showPassword: false,
    showConfirmPassword: false,
    credentialForm_valid: true,
    passwordForm_valid: true,
    signup_name: "",
    signup_nameRules: [
      (v) => !!v || tData.step1.username.emptyErr,
      (v) => (v && v.length <= 15) || tData.step1.username.exceedErr,
    ],
    signup_dpName: "",
    signup_dpNameRules: [
      (v) => !!v || tData.step1.displayName.emptyErr,
      (v) => (v && v.length <= 15) || tData.step1.displayName.exceedErr,
    ],
    signup_email: "",
    signup_emailRules: [
      (v) => !!v || tData.step1.email.emptyErr,
      (v) => /.+@.+\..+/.test(v) || tData.step1.email.exceedErr,
    ],
    signup_password: "",
    signup_passRules: [
      (v) => !!v || tData.step3.password.emptyErr,
      (v) => (v && v.length <= 15) || tData.step3.password.exceedErr,
    ],
    signup_confirmPassword: "",
    signUpEmailStatus: "",
    signUpEmailMsg: "Confirmation",
    passFormStatus: "",
    passFormMsg: "Status",
    showPassError: false,
    showPassMsg: "",
    showUsernameError: false,
    showUsernameMsg: "",
    tData,
  }),
  methods: {
    resetCredentialFormValidation() {
      this.$refs.credentialForm_valid.resetValidation();
    },
    resetPassFormValidation() {
      this.$refs.passwordForm_valid.resetValidation();
    },
    async sendTempPassToUser() {
      try {
        if (this.$refs.credentialForm_valid.validate() === false) {
          setTimeout(() => {
            this.resetCredentialFormValidation();
          }, 3000);
          return;
        }
        const formData = {
          USER_NAME: this.signup_name,
          DISPLAY_NAME: this.signup_dpName,
          USER_EMAIL: this.signup_email,
        };
        common
          .fetchAPIData(config.SENDTEMPASSTOUSER, formData, "POST")
          .then((json) => {
            if (json.status === "Success") {
              sessionStorage.setItem("userData", JSON.stringify(json.userData));
              this.stepNum = 2;
              this.signUpEmailStatus = json.status;
              this.signUpEmailMsg = json.message;
            } else {
              this.showUsernameError = true;
              this.showUsernameMsg = json.message;
            }
          })
          .catch((err) => {
            console.log(err);
          });
      } catch (err) {
        console.log(err);
      }
    },
    async checkPasswordOfUser() {
      try {
        if (this.$refs.passwordForm_valid.validate() === false) {
          setTimeout(() => {
            this.resetPassFormValidation();
          }, 3000);
          return;
        }
        const { USER_NAME, USER_EMAIL, USER_PWD, USER_DISPLAY_NAME } =
          JSON.parse(sessionStorage.getItem("userData"));
        const formData = {
          USER_FE_PASS: this.signup_password,
          USER_NAME: USER_NAME,
          USER_EMAIL: USER_EMAIL,
          USER_PWD: USER_PWD,
          USER_DISPLAY_NAME: USER_DISPLAY_NAME,
        };
        common
          .fetchAPIData(config.CHCKPASSOFUSERANDINSERT, formData, "POST")
          .then((json) => {
            if (json.status === "Success") {
              this.stepNum = 4;
              this.passFormStatus = json.status;
              this.passFormMsg = json.message;
            } else {
              this.showPassError = true;
              this.showPassMsg = json.message;
            }
          })
          .catch((err) => {
            console.log(err);
          });
      } catch (err) {
        console.log(err);
      }
    },
    switchToSignInForm() {
      sessionStorage.clear();
      this.$emit("setCrTab", "0");
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
.errorMsg {
  color: red;
  font-size: 12px;
  font-weight: bold;
}
</style>
