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
    path : '/restore',
    controller : routes.RestoreData_
}]