// Packages/Functions Imports
const crypto = require("crypto");
const fast2sms = require("fast-two-sms");
const nodemailer = require("nodemailer");
const config = require("../config/config");

class HelperFun {
  encryptPass = (rawPass) => {
    const hashPwd = crypto.createHash("sha1").update(rawPass).digest("hex");
    return hashPwd;
  };
  sendOTPToUser = async (userEmail, userOTP) => {
    const EMAIL_BODY = `<div style="font-family: Helvetica,Arial,sans-serif;min-width:1000px;overflow:auto;line-height:2"> <div style="margin:50px auto;width:70%;padding:20px 0"> <div style="border-bottom:1px solid #eee"> <a href="" style="font-size:1.4em;color: #00466a;text-decoration:none;font-weight:600">${config.PROJ_NAME} Forgot Password Procedure</a> </div><p style="font-size:1.1em">Hi,</p><p>Thank you for choosing ${config.PROJ_NAME}. <br>Use the following OTP to complete the procedure. <br>OTP is valid for 10 minutes.</p><h2 style="background: #00466a;margin: 0 auto;width: max-content;padding: 0 10px;color: #fff;border-radius: 4px;">${userOTP}</h2> <p style="font-size:0.9em;">Regards,<br/>${config.PROJ_NAME}</p></div></div>`;
    try {
      var transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false, // use SSL
        auth: {
          user: process.env.SENDER_EMAIL,
          pass: process.env.SENDER_PASS,
        },
      });
      var mailOptions = {
        from: {
          name: config.PROJ_NAME,
          address: process.env.SENDER_EMAIL,
        },
        to: userEmail,
        subject: `${config.PROJ_NAME} Forgot Password Procedure`,
        html: EMAIL_BODY,
      };
      transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
          return false;
        } else {
          return true;
        }
      });
    } catch (err) {
      console.log(err);
    }
  };

  sendTemporaryPassToUser = async (userEmail, tempPass) => {
    const EMAIL_BODY = `<div style="font-family: Helvetica,Arial,sans-serif;min-width:1000px;overflow:auto;line-height:2"> <div style="margin:50px auto;width:70%;padding:20px 0"> <div style="border-bottom:1px solid #eee"> <a href="" style="font-size:1.4em;color: #00466a;text-decoration:none;font-weight:600">${config.PROJ_NAME}</a> </div><p style="font-size:1.1em">Hi,</p><p>Thank you for choosing ${config.PROJ_NAME}. Use this <b>Temporary password</b> to login. You can change your password anytime you want.</p><p>The <b>Temporary password</b> is: </p><h2 style="background: #00466a;margin: 0 auto;width: max-content;padding: 0 10px;color: #fff;border-radius: 4px;">${tempPass}</h2> <p style="font-size:0.9em;">Regards,<br/>${config.PROJ_NAME}</p></div></div>`;
    try {
      var transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false, // use SSL
        auth: {
          user: process.env.SENDER_EMAIL,
          pass: process.env.SENDER_PASS,
        },
      });
      var mailOptions = {
        from: {
          name: config.PROJ_NAME,
          address: process.env.SENDER_EMAIL,
        },
        to: userEmail,
        subject: `${config.PROJ_NAME} Temporary Password`,
        html: EMAIL_BODY,
      };
      transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
          return false;
        } else {
          return true;
        }
      });
    } catch (err) {
      console.log(err);
    }
  };
  generateRand6DigitNum() {
    var digits = "0123456789";
    let OTP = "";
    for (let i = 0; i < 6; i++) {
      OTP += digits[Math.floor(Math.random() * 10)];
    }
    return OTP;
  }

  randomColorGen() {
    var randomColor = "#" + Math.floor(Math.random() * 16777215).toString(16);
    return randomColor;
  }

  isOTPDateValid = function (firstDate) {
    var secondDate = new Date();
    if (firstDate.setHours(0, 0, 0, 0) >= secondDate.setHours(0, 0, 0, 0)) {
      return true;
    }
    return false;
  };

  generateRandomString = (length) => {
    let result = "",
      seeds;

    for (let i = 0; i < length - 1; i++) {
      //Generate seeds array, that will be the bag from where randomly select generated char
      seeds = [
        Math.floor(Math.random() * 10) + 48,
        Math.floor(Math.random() * 25) + 65,
        Math.floor(Math.random() * 25) + 97,
      ];

      //Choise randomly from seeds, convert to char and append to result
      result += String.fromCharCode(seeds[Math.floor(Math.random() * 3)]);
    }

    return result;
  };
  sendOTPSMS = async () => {
    const res = await fast2sms.sendMessage({
      authorization:
        "PTf4XcOpSi28YyhK53DdzvBU1aIm0qCNuF9jwHrbMltgskVoEWdsFQneAYwxTLu7a5cv4P69JofhVIjy",
      message: "This SMS is sent by Yash using Node.js To Papa",
      numbers: ["9325533510"],
    });
    console.log(res);
  };
  convertJSDatetimeToMYSQLDatetime = (jsDate) => {
    return new Date(jsDate).toISOString().slice(0, 19).replace("T", " ");
  };
  generatePassword(passwordLength) {
    var numberChars = "0123456789";
    var upperChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    var lowerChars = "abcdefghijklmnopqrstuvwxyz";
    var allChars = numberChars + upperChars + lowerChars;
    var randPasswordArray = Array(passwordLength);
    randPasswordArray[0] = numberChars;
    randPasswordArray[1] = upperChars;
    randPasswordArray[2] = lowerChars;
    randPasswordArray = randPasswordArray.fill(allChars, 3);
    return this.shuffleArray(
      randPasswordArray.map(function (x) {
        return x[Math.floor(Math.random() * x.length)];
      })
    ).join("");
  }

  shuffleArray(array) {
    for (var i = array.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var temp = array[i];
      array[i] = array[j];
      array[j] = temp;
    }
    return array;
  }
}

// File Export
module.exports = HelperFun;
