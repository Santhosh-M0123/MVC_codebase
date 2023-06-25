const routes = require("../Controller/index");

module.exports = [{
    path : "/login",
    controller : routes.LoginUser_,
},
{
    path : '/register',
    controller : routes.RegisterUser_
},
{
    path : "/upload",
    controller : routes.FileUpload_
},{
    path : '/logout',
    controller : routes.LogoutUser_
},{
    path : '/forgetpassword',
    controller : routes.ForgetPassword_
},
{
    path : '/confirmotp',
    controller : routes.ConfirmOTP_
},
{
    path : '/createnewpassword',
    controller : routes.CreateNewPassword_
},
{
    path : '/changepassword',
    controller : routes.ChangePassword_
},{
    path : '/deleteaccount',
    controller : routes.DeleteProfile_
},{
    path : '/restore',
    controller : routes.RestoreAccount_
}]