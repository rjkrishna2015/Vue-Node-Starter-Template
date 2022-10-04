//? Packages/Functions Imports START ?//
const router = require("express").Router();
const DB = require("../utils/databaseFunctions");
const db = new DB();
const HelperFun = require("../helpers/helperFun");
const hf = new HelperFun();
const { v4: uuidv4 } = require("uuid");
const config = require("../config/config");
//? Packages/Functions Imports END ?//

//! AUTHENTICATION APIS START !//
router.post(config.SIGIN_API, async (req, res) => {
  try {
    const { USER_NAME, USER_PASS } = req.body;
    const encyptedPass = hf.encryptPass(USER_PASS);
    const sql = `SELECT * from ${config.COMMON_USER_TB} WHERE USER_NAME = '${USER_NAME}' AND USER_PWD = '${encyptedPass}'`;
    const result = await db.get_one_record_row(sql);
    if (result.length > 0) {
      const myRes = JSON.parse(JSON.stringify(result));
      if (myRes[0].USER_STATUS === "Y") {
        await updateUserTokenInDB(myRes[0].ID);
        delete myRes[0].USER_PWD;
        return res.json({
          status: "Success",
          message: "Login Successful!",
          userData: myRes[0],
        });
      } else {
        return res.json({
          status: "Failed",
          message: "Login Failed! Your account is inactive...",
        });
      }
    } else {
      return res.json({
        status: "Failed",
        message: "Login Failed! Try with another password or username.",
      });
    }
  } catch (error) {
    console.log(error);
    return res.json({
      error: error,
    });
  }
});
router.post(config.SENDTEMPASSTOUSER, async (req, res) => {
  try {
    const { USER_NAME, DISPLAY_NAME, USER_EMAIL } = req.body;
    const tempUserPass = hf.generatePassword(8);
    const encyptedPass = hf.encryptPass(tempUserPass);
    var sql = `SELECT COUNT(ID) AS cnt from ${config.COMMON_USER_TB} WHERE USER_NAME = '${USER_NAME}'`;
    const tRes = await db.get_multiple_tables_records(sql);
    const myRes = JSON.parse(JSON.stringify(tRes));
    if (myRes[0].cnt > 0) {
      return res.json({
        status: "Failed",
        message: "User already exists... Try with another username",
      });
    } else {
      hf.sendTemporaryPassToUser(USER_EMAIL, tempUserPass);
      const uData = {
        USER_NAME: USER_NAME,
        USER_EMAIL: USER_EMAIL,
        USER_PWD: encyptedPass,
        USER_DISPLAY_NAME: DISPLAY_NAME,
      };
      return res.json({
        status: "Success",
        message:
          "A temporary password has been sent to your email. Please use the temporary password to complete the procedure.",
        userData: uData,
      });
    }
  } catch (error) {
    console.log(error);
    return res.json({
      error: error,
    });
  }
});
router.post(config.CHCKPASSOFUSERANDINSERT, async (req, res) => {
  try {
    const { USER_FE_PASS, USER_NAME, USER_EMAIL, USER_PWD, USER_DISPLAY_NAME } =
      req.body;
    const encyptedFEPass = hf.encryptPass(USER_FE_PASS);
    if (USER_PWD !== encyptedFEPass) {
      return res.json({
        status: "Failed",
        message:
          "The password sent to your email does not match. Please try again...",
      });
    } else {
      const fieldValPair = [
        { USER_NAME },
        { USER_DISPLAY_NAME: USER_DISPLAY_NAME },
        { USER_EMAIL },
        { USER_AVATAR_COLOR: hf.randomColorGen() },
        { USER_PWD: encyptedFEPass },
        { USER_TOKEN: uuidv4() },
        { USER_OTP: 0 },
        { USER_OTP_EXPIRE: "" },
        { USER_LAST_LOGIN: new Date() },
        { USER_TYPE: "U" },
        { USER_STATUS: "Y" },
      ];
      const result = await db.insert_records_with_array(
        config.COMMON_USER_TB,
        fieldValPair
      );
      if (result) {
        return res.json({
          status: "Success",
          message:
            "User created successfully. Please login with your username and the temporary password. You can change your password after logging in.",
        });
      } else {
        return res.json({
          status: "Failed",
          message: "Failed to create user...",
        });
      }
    }
  } catch (error) {
    return res.json({
      error: "Something went really wrong. Please try again later...",
    });
  }
});

// FORGOT PASSWORD ROUTES //
router.post(config.CHECKUSERNAMEINDBANDSENDOTP_API, async (req, res) => {
  const { USER_NAME } = req.body;
  const sql = `SELECT * from ${config.COMMON_USER_TB} WHERE USER_NAME = '${USER_NAME}'`;
  const result = await db.get_one_record_row(sql);
  if (result.length > 0) {
    const myRes = JSON.parse(JSON.stringify(result));
    const randOTP = hf.generateRand6DigitNum();
    await hf.sendOTPToUser(myRes[0].USER_EMAIL, randOTP);
    var add10Min = new Date();
    add10Min.setMinutes(add10Min.getMinutes() + 10);
    const fieldValPair = [
      {
        USER_OTP: randOTP,
      },
      { USER_OTP_EXPIRE: hf.convertJSDatetimeToMYSQLDatetime(add10Min) },
    ];
    await db.set_multiple_fields(
      config.COMMON_USER_TB,
      fieldValPair,
      `ID = ${myRes[0].ID}`
    );
    return res.json({
      status: "Success",
      message: "User exists in our Database",
      userID: myRes[0].ID,
    });
  } else {
    return res.json({
      status: "Failed",
      message:
        "User does not exist in our Database. Try again with another username...",
    });
  }
});
router.post(config.VERIFYOTP_API, async (req, res) => {
  const { USER_ID, USER_OTP } = req.body;
  const sql = `SELECT * from ${config.COMMON_USER_TB} WHERE ID = ${USER_ID}`;
  const result = await db.get_one_record_row(sql);
  const myRes = JSON.parse(JSON.stringify(result));
  if (parseInt(myRes[0].USER_OTP) === parseInt(USER_OTP)) {
    if (hf.isOTPDateValid(new Date(myRes[0].USER_OTP_EXPIRE))) {
      return res.json({
        status: "Success",
        message: "You can change your password now!",
      });
    } else {
      return res.json({
        status: "Failed",
        message: "The OTP you have entered is expired...",
      });
    }
  } else {
    return res.json({
      status: "Failed",
      message: "The OTP you have entered is not valid...",
    });
  }
});
router.post(config.CHANGEPASSWORD_API, async (req, res) => {
  const { USER_ID, USER_PASS } = req.body;
  const encryptedPass = hf.encryptPass(USER_PASS);
  const fieldValPair = [{ USER_PWD: encryptedPass }];
  const result = await db.set_multiple_fields(
    config.COMMON_USER_TB,
    fieldValPair,
    `ID = ${USER_ID}`
  );
  if (result) {
    return res.json({
      status: "Success",
      message: "Your password has been changed successfuly...",
    });
  } else {
    return res.json({
      status: "Failed",
      message: "Failed to change your password...",
    });
  }
});
// FORGOT PASSWORD ROUTES //

// CHANGE PASSWORD ROUTES //
router.post(config.CHECKUSERWITHPASS_API, async (req, res) => {
  try {
    const { PREV_PASS, USER_NAME } = req.body;
    const encyptedPass = hf.encryptPass(PREV_PASS);
    const sql = `SELECT * from ${config.COMMON_USER_TB} WHERE USER_NAME = '${USER_NAME}' AND USER_PWD = '${encyptedPass}'`;
    const result = await db.get_one_record_row(sql);
    const myRes = JSON.parse(JSON.stringify(result));
    if (result.length > 0) {
      return res.json({
        status: "Success",
        message: "Go Ahead!",
        userId: myRes[0].ID,
      });
    } else {
      return res.json({
        status: "Failed",
        message:
          "Your account does not use this password. Try again with another password...",
      });
    }
  } catch (error) {
    console.log(error);
    return res.json({
      error: "Something went really wrong. Please try again later...",
      msg: error,
    });
  }
});
// CHANGE PASSWORD ROUTES //
//! AUTHENTICATION APIS END !//

//* Helper Functions with DB Interactions START *//
const updateUserTokenInDB = async (USER_ID) => {
  try {
    const fieldValuePair = [{ USER_TOKEN: uuidv4() }];
    const result = await db.set_multiple_fields(
      config.COMMON_USER_TB,
      fieldValuePair,
      `ID = ${USER_ID}`
    );
    if (result) {
      return true;
    } else {
      return false;
    }
  } catch (err) {
    console.log(err);
  }
};
//* Helper Functions with DB Interactions END *//

// File Export
module.exports = router;
