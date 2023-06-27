//module that contains every controller for easy access
const LoginUser_ = require("./UserLogin");
const RegisterUser_ = require('./userRegister');
const {singleFileUpload_,multipleFileUpload_} = require("./fileUpload");
const LogoutUser_ = require('./UserLogout');
const {ForgetPassword_,ConfirmOTP_ , CreateNewPassword_} = require('./forgetPassword');
const ChangePassword_ = require('./changePassword');
const DeleteProfile_ = require('./deleteProfile');
const RestoreData_ = require('./restoreDeletedData');
const GetData = require('./getMethod');
//export as an object of every controller present at controller folder
module.exports = {
    LoginUser_,
    RegisterUser_,
    LogoutUser_,
    ForgetPassword_,
    ChangePassword_,
    ConfirmOTP_,
    CreateNewPassword_,
    DeleteProfile_,
    RestoreData_,
    GetData,
    singleFileUpload_,
    multipleFileUpload_
}