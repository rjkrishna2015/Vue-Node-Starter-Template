const templateData = {
  projName: "Vue Node Starter Template",
  headerComp: {
    homeTooltip: "Home",
    homeIcon: "mdi-home",
    logoutTooltip: "Logout",
    logoutIcon: "mdi-logout",
    dashboardText: "Dashboard",
    dashboardIcon: "mdi-view-dashboard",
    changePasswordText: "Change Password",
    changePasswordIcon: "mdi-lock-reset",
    debugOnText: "Debug On",
  },
  footerComp: {
    copyrightPre: "Copyright © ",
    copyrightSuff: "Yash Sharma",
  },
  loginHome: {
    loginText: "LOGIN",
    regTest: "REGISTER",
  },
  signIn: {
    username: {
      label: "Username",
      icon: "mdi-account",
      emptyErr: "Username is required",
      exceedErr: "Username must be less than 15 characters",
    },
    password: {
      label: "Password",
      icon: "mdi-lock",
      emptyErr: "Password is required",
      exceedErr: "Password must be less than 15 characters",
    },
    btnText: "Sign In",
    forgotPassText: "Forgot Password?",
  },
  signUp: {
    step1: {
      title: "Enter Credentials",
      username: {
        label: "Username",
        icon: "mdi-account",
        emptyErr: "Username is required",
        exceedErr: "Username must be less than 15 characters",
      },
      displayName: {
        label: "Display Name",
        icon: "mdi-account",
        emptyErr: "Display Name is required",
        exceedErr: "Display Name must be less than 15 characters",
      },
      email: {
        label: "Email",
        icon: "mdi-email",
        emptyErr: "E-mail is required",
        exceedErr: "E-mail must be valid",
      },
      btnText: "Submit",
    },
    step3: {
      title: "Enter the Temporary password",
      password: {
        label: "Password",
        icon: "mdi-lock",
        emptyErr: "Password is required",
        exceedErr: "Password must be less than 15 characters",
      },
      btnText: "Submit",
    },
  },
  forgotPassword: {
    step1: {
      title: "Enter your Username",
      username: {
        label: "Username",
        icon: "mdi-account",
        emptyErr: "Username is required",
        exceedErr: "Username must be less than 15 characters",
      },
      btnText: "Submit",
    },
    step2: {
      title: "Enter the OTP sent to your email",
      btnText: "Resend OTP",
    },
    step3: {
      title: "Change Password",
      password: {
        label: "Password",
        icon: "mdi-lock",
        emptyErr: "Password is required",
        exceedErr: "Password must be less than 15 characters",
      },
      confirm_password: {
        label: "Confirm Password",
        icon: "mdi-lock",
        emptyErr: "Confirm Password is required",
        notMatchErr: "The password confirmation does not match.",
      },
      btnText: "Submit",
    },
    forgotPassMsg: "Password Status",
  },
  changePassword: {
    title: "Change Password",
    step1: {
      title: "Enter your current password",
      password: {
        label: "Password",
        icon: "mdi-lock",
        emptyErr: "Password is required",
        exceedErr: "Password must be less than 15 characters",
      },
      btnText: "Submit",
    },
    step2: {
      title: "New Password",
      password: {
        label: "Password",
        icon: "mdi-lock",
        emptyErr: "Password is required",
        exceedErr: "Password must be less than 15 characters",
      },
      confirm_password: {
        label: "Confirm Password",
        icon: "mdi-lock",
        emptyErr: "Confirm Password is required",
        notMatchErr: "The password confirmation does not match.",
      },
      btnText: "Submit",
    },
    logoutDialog: {
      title: "Your password has been changed successfuly...",
      cardText:
        "Click OK to logout and then login again with your new password.",
      btnText: "Logout",
    },
  },
};

export default templateData;
