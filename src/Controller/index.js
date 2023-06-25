//module that contains every controller for easy access
const LoginUser_ = require("./UserLogin");
const RegisterUser_ = require('./userRegister');
const FileUpload_ = require("./fileUpload");
const LogoutUser_ = require('./UserLogout');
const {ForgetPassword_,ConfirmOTP_ , CreateNewPassword_} = require('./forgetPassword');
const ChangePassword_ = require('./changePassword');
const DeleteProfile_ = require('./deleteProfile');
const RestoreData_ = require('./restoreDeletedData');
//export as an object of every controller present at controller folder
module.exports = {
    LoginUser_,
    FileUpload_,
    RegisterUser_,
    LogoutUser_,
    ForgetPassword_,
    ChangePassword_,
    ConfirmOTP_,
    CreateNewPassword_,
    DeleteProfile_,
    RestoreData_
}