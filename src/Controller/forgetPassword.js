const User_Auth = require("../Model/authModel"); //module from model directory - authModel
const { Op } = require("sequelize");
const generateOtp = require("../Helpers/generateOtp"); //module from Helpers directory - generateOtp
const { OTPMail } = require("../Helpers/mailer"); //module from Helper directory - mailer

async function ForgetPassword(req, res) {
  //credentials maybe of userName or userEmail from the client
  let { credentials } = req.body;
  if (credentials != null) {
    //checks whether the credentials found in user_auth
    let credentialsData = await User_Auth.findOne({
      where: {
        [Op.or]: [{ User_name: credentials }, { User_email: credentials }],
      },
    });
    //   console.log(credentialsData.User_email)
    if (credentialsData != null) {
      let otp = generateOtp(6); //generate OTP for the user
      try{
        await User_Auth.update(
            { User_OTP: otp },
            { where: { User_id: credentialsData.User_id } }
          )
            .then( async () => {
              let MailStatus = await OTPMail(credentialsData.User_email, otp) //Send OTP to the mail of the User
              if(MailStatus){
                res.send({credential : credentialsData.User_email});
              }else{
                res.status(400).send('Error occurs!! :|');
              }
            })
            .catch((e) => console.log(e));
      }catch(e){
        console.log("error from here")
        console.log(e)
      }
    }
  } else {
    res.status(400).send("Fields should not be empty");
  }
}

//confirm OTP send to the User
async function ConfirmOTP(req, res) {
  //Get OTP from the body
  let { Otp, credentials } = req.body;
  if (Otp) {
    try {
      let OTPuser = await User_Auth.findOne({
        where: {
          User_email: credentials,
        },
      });
      if (OTPuser.User_OTP == Otp) {
        await User_Auth.update(
          { User_OTP: null },
          { where: { User_id: OTPuser.User_id } }
        )
          .then(() => {
            res.status(200).send("OTP Successful");
          })
          .catch((e) => res.status(400).send("Unable to Parse the Update!!!"));
      } else {
        res.status(400).send("OTP mismatches");
      }
    } catch (e) {
      console.log(e);
    }
  }
}

//Create New password once after gets OTP verified
async function CreateNewPassword(req, res) {
  let { credentials, password } = req.body;
  try {
    let changePass = await User_Auth.update(
      { User_password: password },
      { where: { User_email: credentials } }
    );
    if (changePass) {
      res.status(200).send("Password Updated successfully");
    } else {
      res.status(400).send("Cannot update password");
    }
  } catch (e) {
    console.log(e);
  }
}
let ForgetPassword_ = {
  post: ForgetPassword,
};
let ConfirmOTP_ = {
  post: ConfirmOTP,
};
let CreateNewPassword_ = {
  post: CreateNewPassword,
};
module.exports = { ForgetPassword_, ConfirmOTP_, CreateNewPassword_ };
